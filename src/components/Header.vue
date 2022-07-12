<!-- eslint-disable max-len -->
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
      <div v-for="link in contactLinks.filter(link => link.unset === false)" :key="link.id" class="canvas-icon"
        :style="{ 'left': `${link.x}px`, 'top': `${link.y}px` }">
        <a :href="link.url" class="text-decoration-none" :download="link.isFile && link.url">
          <v-icon dark size="60" color="secondary">
            {{ link.logo }}
          </v-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ContactLink } from '@/types';
import { Component, Vue } from 'vue-property-decorator';
import Runner from '../canvas-runner';

function getLinks(): ContactLink[] {
  return [
    {
      id: 'github',
      x: 0,
      y: 0,
      logo: 'mdi-github',
      unset: true,
      url: 'https://github.com/labbealexandre',
    },
    {
      id: 'linkedin',
      x: 0,
      y: 0,
      logo: 'mdi-linkedin',
      unset: true,
      url: 'https://www.linkedin.com/in/alex-labbe/',
    },
    {
      id: 'reddit',
      x: 0,
      y: 0,
      logo: 'mdi-file-account',
      unset: true,
      url: 'resume_en.pdf',
      isFile: true,
    },
  ];
}

@Component({})
export default class Header extends Vue {
  canvas?: HTMLCanvasElement

  runner?: Runner

  contactLinks = getLinks()

  mounted(): void {
    this.canvas = document.getElementById('background') as HTMLCanvasElement;
    this.runner = new Runner(
      this.$vuetify.theme.themes.light.secondary?.toString() || '#ffffff',
      this.$vuetify.theme.themes.light.primary?.toString() || '#ffffff',
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

  setContactLinks(): void {
    this.contactLinks = (this.runner?.iconsPositions || []).map(([x, y], index) => ({
      ...getLinks()[index],
      x: Math.round(x),
      y: Math.round(y),
      unset: false,
    }));
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
      this.setContactLinks();
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
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.header-title {
  animation: fadeIn linear 2s;
}

.canvas-icon {
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>
