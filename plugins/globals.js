import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'



export default function ({ $moment }) {
  $moment.locale("ru");
}

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fas)




// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Element, { locale })
Vue.filter('firstLetter', (str = 'string') => str[0].toUpperCase() + str.slice(1))


