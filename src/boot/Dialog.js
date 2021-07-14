import { Dialog } from 'quasar'
export default ({ app, router, store, Vue }) => {
  Vue.prototype.$alertDialog = function (title = '', parent) {
    return Dialog({
      component: () => import('../components/AlertDialog.vue'),
      parent,
      nossoTitleCustom: title
    })
  }
}
