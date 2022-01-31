import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fr from 'vuetify/src/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { fr },
    current: 'fr',
  },
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#0e387a',
        secondary: '#9fafca',
      },
    },
  },
});
