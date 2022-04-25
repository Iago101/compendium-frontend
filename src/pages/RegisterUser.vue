<template>
    <q-page class="bg-amber-3">
        <div class="row justify-center">
            <q-card class="col-8 text-center">
                <q-form @submit="submit">
                    <div class="text-h3 q-mt-xl">
                        Bem-Vindo ao 𝕮𝖔𝖒𝖕𝖊𝖓𝖉𝖎𝖚𝖒!
                    </div>
                    <div class="text-h4 q-mt-sm">
                        A rede social do RPGzista moderno
                    </div>
                    <div class="text-h4 q-mt-xl">
                        Para começar, basta criar a sua conta abaixo:
                    </div>

                    <q-card class="bg-amber-3 text-h6 q-pa-sm q-mx-auto q-my-xl" style="width:400px">
                        <div>
                            Insira o seu e-mail:
                            <q-input
                                ref="email"
                                v-model="form.email"
                                :rules="[$data.$rules.required, $data.$rules.email]"
                                :lazy-rules="true"
                                outlined
                                dense
                                class="q-mx-auto q-mt-sm bg-white no-padding"
                                style="width: 200px"
                                label="E-mail"
                            />
                        </div>

                        <div class="q-mt-md">
                            Insira o seu nome:
                            <q-input
                                ref="name"
                                v-model="form.name"
                                :rules="[$data.$rules.required]"
                                :lazy-rules="true"
                                outlined
                                dense
                                style="width: 200px"
                                label="Nome"
                                class="bg-white q-mx-auto no-padding"
                            />
                        </div>

                        <div class="q-mt-md">
                            Insira a sua senha:
                            <q-input
                                ref="password"
                                v-model="form.password"
                                :rules="[$data.$rules.required]"
                                :lazy-rules="true"
                                type="password"
                                outlined
                                dense
                                style="width: 200px"
                                label="Senha"
                                class="bg-white q-mx-auto no-padding"
                            />
                        </div>
                        <div class="q-mt-md q-mb-xl">
                            Confirme a sua senha:
                            <q-input
                                ref="password"
                                v-model="form.passwordConfirmation"
                                :rules="[$data.$rules.required]"
                                :lazy-rules="true"
                                type="password"
                                outlined
                                dense
                                style="width: 200px"
                                label="Confirme a Senha"
                                class="bg-white q-mx-auto no-padding"
                            />
                        </div>
                        <div>
                          <q-checkbox v-model="politics"/>Eu concordo com as

                          <div
                           class="text-indigo cursor-pointer"
                           @click="terms=true">
                           Políticas do site
                          </div>
                        </div>
                        <div>
                          <q-checkbox v-model="useTerms"/>Eu concordo com os

                          <div
                           class="text-indigo cursor-pointer"
                           @click="terms=true">
                           Termos de uso
                          </div>
                        </div>

                        <q-btn
                            color="indigo"
                            class="q-mt-lg"
                            type="submit"

                        > Registrar
                        </q-btn>
                    </q-card>
                </q-form>
            </q-card>

        </div>

        <q-dialog v-model="terms" maximized>
          <use-terms
          />
        </q-dialog>

        <q-dialog v-model="alert">
          <q-card>
            <q-card-section>
              <div class="text-h6">Atenção!</div>
            </q-card-section>

            <q-card-section v-if="alertEmail" class="q-pt-none">
              Esse e-mail já foi cadastrado! Tente outro ou faça login para continuar
            </q-card-section>

            <q-card-section v-if="alertPassword" class="q-pt-none">
              As senhas não coincidem!
            </q-card-section>

            <q-card-section v-if="useTerms == false || politics == false" class="q-pt-none">
              você precisa aceitar os termos de uso
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" @click="alertEmail=false, alertPassword = false" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="alertCreate">
          <q-card>
            <q-card-section>
              <div class="text-h6">Seja bem vindo</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Conta criada com sucesso!
              Obrigado por se juntar à comunidade Compendium, espero que aproveite a estadia
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Vamos lá!" color="primary" @click="$router.push('/')" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import feathersClient from '../boot/feathers-client'

export default {
  name: 'RegisterUser',

  components: {
    UseTerms: () => import('../components/UseTerms.vue')
  },

  methods: {
    ...mapActions('auth', ['authenticate']),

    async submit () {
      this.error = false
      await this.$resetValidation(this.form)
      if (
        !(await this.$validate(this.form))
      ) return
      if (this.form.password !== this.form.passwordConfirmation) {
        this.alertPassword = true
        this.alert = true
        return
      }
      if (this.useTerms === false || this.politics === false) {
        this.alert = true
        return
      }
      try {
        const aux = await feathersClient.service('users-public').find({
          query: {
            email: this.form.email
          }
        })
        if (aux.data.length > 0) {
          this.alertEmail = true
          this.alert = true
          return
        } else {
          await feathersClient.service('users-public').create(this.form)
          const authForm = {
            strategy: 'local',
            email: this.form.email,
            password: this.form.password
          }
          await this.authenticate(authForm)

          this.alertCreate = true
        }
      } catch (error) {
        if (error.message === 'email: value already exists.') {
          this.alertEmail = true
          this.alert = true
        }
      }
    }

  },

  data () {
    return {
      alert: false,
      alertPassword: false,
      alertEmail: false,
      alertCreate: false,
      message: null,
      useTerms: false,
      terms: false,
      politics: false,
      form: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  }

}
</script>
