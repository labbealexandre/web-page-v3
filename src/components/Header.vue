<template>
    <div id="container">
        <canvas id="background" :width="width" :height="height"></canvas>
        <div id="overlay">
            <h1 class="secondary--text display-4 mb-6 header-title">
                Alexandre Labbé
            </h1>
            <h1 class="secondary--text display-2 header-title">
                IT Security Consultant
            </h1>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Runner from '../canvas-runner';

@Component({})
export default class Header extends Vue {
    width = window.innerWidth

    height = window.innerHeight

    // eslint-disable-next-line class-methods-use-this
    mounted(): void {
      const runner = new Runner(this.$vuetify.theme.themes.light.secondary?.toString() || '#ffffff');
      runner.draw();

      window.setInterval(() => { runner.draw(); }, 8);
    }
}

</script>

<style scoped>
#container {
    position: relative;
    height: 100vh;
    width: 100vw;
}

#background {
    position: absolute;
    background-color: var(--v-primary-base);
}

#overlay {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

.header-title {
    animation: fadeIn linear 2s;
}

</style>
