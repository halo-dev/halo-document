import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';

export default ({ Vue, isServer }) => {
  /**
   * Only import element-ui under client side.
   */
  if (!isServer) {
    import('element-ui').then(elementUI => {
      Vue.use(elementUI.default, { locale })
    })
  }
}