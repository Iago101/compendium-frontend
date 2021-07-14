import { Dialog } from 'quasar'
import AlertDialog from '../components/AlertDialog.vue'
export default ({ app, router, store, Vue }) => {
  Vue.prototype.$alertDialog = function (text, par) {
    return Dialog.create({
      component: AlertDialog,
      parent: par,
      message: text
    })
  }
}
