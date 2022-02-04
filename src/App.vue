<template>
  <v-app>
    <v-main>
        <Home v-if="!wrongOrientation"/>
        <MobileLandscape v-if="wrongOrientation"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './components/Home.vue';
import MobileLandscape from './components/MobileLandscape.vue';

@Component({
  components: {
    Home,
    MobileLandscape,
  },
})
export default class App extends Vue {
  wrongOrientation = false

  handleOrientationChange(): void {
    this.wrongOrientation = this.$device.mobile
      && window.screen.orientation.type === 'landscape-primary';
  }

  mounted(): void {
    this.handleOrientationChange();
    window.addEventListener(
      'orientationchange',
      this.handleOrientationChange,
    );
  }
}
</script>
