<!-- eslint-disable max-len -->
<template>
  <v-container>
    <v-row class="mt-6">
      <v-col>
        <h1 class="primary--text text-md-h2 text-h3 mb-6 header-title">
          My side projects
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="project in projects" :key="project.title" :sm="12" :md="6" :lg="4">
        <Card :title="project.title" :date="project.date" :description="project.description" :logo="project.logo"
          :image="project.image" :url="project.url" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from './Card.vue';

import type { Project } from '../types';

function getProjects(): Project[] {
  return [
    {
      title: 'SQLi Semi-automatic exploitation',
      date: '25/07/2022',
      description: 'Tool to exploit SQL injections with a full control on the sent requests',
      logo: 'mdi-language-python',
      image: 'my-sqli.png',
      url: 'https://github.com/labbealexandre/my-sqli',
    },
    // {
    //   title: 'ASCII filter',
    //   date: '04/07/2021',
    //   description: 'Add an ASCII filter on your camera',
    //   logo: 'mdi-language-python',
    //   image: 'ascii-cam.png',
    //   url: 'https://github.com/labbealexandre/ascii_cam',
    // },
    // {
    //   title: 'Ray-Tracing',
    //   date: '13/09/2021',
    //   description: 'Ray-Tracing engine for simple scenes',
    //   logo: 'mdi-language-cpp',
    //   image: 'ray-tracing.png',
    //   url: 'https://github.com/labbealexandre/ray-tracing',
    // },
    {
      title: 'My Web Site',
      date: '25/01/2022',
      description: 'This is my personnal web site',
      logo: 'mdi-vuejs',
      image: 'web-page.png',
      url: 'https://github.com/labbealexandre/web-page-v3',
    },
    // {
    //   title: 'Advent of Code',
    //   date: '25/12/2021',
    //   description: 'Advent of Code made with clojure',
    //   logo: 'mdi-language-java',
    //   image: 'wip.png',
    //   url: 'https://github.com/labbealexandre/advent-of-code',
    // },
  ];
}

@Component({
  components: {
    Card,
  },
})
export default class Board extends Vue {
  projects = getProjects()
}

</script>
