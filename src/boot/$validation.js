/* eslint-disable no-useless-escape */
import { scroll } from 'quasar'

// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line no-useless-escape
// eslint-disable-next-line prefer-regex-literals
// eslint-disable-next-line no-useless-escape
// eslint-disable-next-line prefer-regex-literals
const emailRegex = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')

const { getScrollTarget, setScrollPosition } = scroll

import Vue from 'vue'

export default async () => {
  Vue.mixin({
    data () {
      return {
        $rules: {
          required: (val) => (val !== null && val !== '') || 'Campo obrigatorio',
          requiredIf: (cond) => (val) => {
            if (!cond || (cond && !!val)) {
              return true
            }
            return 'Field required'
          },
          equals: (value, field) => (val) => value === val || `O valor precisa ser igual ao '${field}'`,
          lesserThan: (value) => (val) => parseFloat(val) < value || `The value must be lesser than ${value}`,
          lesserThanOrEqual: (value) => (val) => parseFloat(val) <= value || `The value must be lesser than or equal to ${value}`,
          greaterThan: (value) => (val) => parseFloat(val) > 0 || `The value must be greater than ${value}`,
          greaterThanOrEqual: (value) => (val) => parseFloat(val) >= value || `The value must be greater than or equal to ${value}`,
          minLength: (value) => (val) => !val || val.length >= value || `Please type at least ${value} characters`,
          email: (val) => !val || emailRegex.test(val) || 'Entre um email valido.'
        }
      }
    },
    methods: {
      async $validate (form) {
        if (!form) return true
        let valid = true
        let el
        for await (const key of Object.keys(form)) {
          if (Array.isArray(form[key])) {
            for (let i = 0; i < form[key].length; i += 1) {
              for await (const subKey of Object.keys(form[key][i])) {
                valid = await this.$refs[`${key}${i}_${subKey}`][0].validate() && valid
                if (!valid && (!el || el.$el.offsetTop > this.$refs[`${key}${i}_${subKey}`][0].$el.offsetTop)) {
                  el = this.$refs[`${key}${i}_${subKey}`][0]
                }
              }
            }
          } else if (this.$refs[key]) {
            // Form components
            if (this.$refs[key].onValidate) {
              valid = await this.$refs[key].onValidate() && valid
            } else if (this.$refs[key].validate) {
              valid = await this.$refs[key].validate() && valid
            }
            if (!valid && (!el || el.$el.offsetTop > this.$refs[key].$el.offsetTop)) {
              el = this.$refs[key]
            }
          }
        }
        if (!valid) {
          setScrollPosition(getScrollTarget(el.$el), el.$el.offsetTop, 300)
        }
        return valid
      },
      async $resetValidation (form) {
        await this.$nextTick()
        if (!form) return
        for (const key of Object.keys(form)) {
          if (Array.isArray(form[key])) {
            for (let i = 0; i < form[key].length; i += 1) {
              for (const subKey of Object.keys(form[key][i])) {
                if (this.$refs[`${key}${i}_${subKey}`][0] && this.$refs[`${key}${i}_${subKey}`][0].resetValidation) {
                  this.$refs[`${key}${i}_${subKey}`][0].resetValidation()
                }
              }
            }
          } else if (this.$refs[key] && this.$refs[key].resetValidation) {
            this.$refs[key].resetValidation()
          }
        }
      }
    }
  })
}
