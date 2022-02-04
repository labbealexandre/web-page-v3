<template>
    <div id="container">
        <canvas id="background"></canvas>
        <div id="overlay">
            <h1 class="secondary--text text-md-h1 text-h3 mb-6 header-title">
                Alexandre Labbé
            </h1>
            <h1 class="secondary--text text-md-h3 text-h4 header-title">
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
    canvas?: HTMLCanvasElement

    runner?: Runner

    mounted(): void {
      this.canvas = document.getElementById('background') as HTMLCanvasElement;
      this.runner = new Runner(
          this.$vuetify.theme.themes.light.secondary?.toString() || '#ffffff',
          this.canvas,
          this.$device.mobile as boolean,
      );

      window.addEventListener('resize', this.resizeCanvas, false);
      this.resizeCanvas();

      window.setInterval(() => {
        if (this.runner) {
          this.runner.draw();
        }
      }, 8);
    }

    resizeCanvas(): void {
      if (!this.canvas || !this.runner) {
        return;
      }

      window.setTimeout(() => {
        if (!this.canvas || !this.runner) return;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.runner.restart();
      }, 200);
    }
}

</script>

<style scoped>
#container {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: var(--v-primary-base);
}

#background {
    position: absolute;
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
