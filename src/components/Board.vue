<template>
    <v-container>
        <v-row justify="space-around" class="mt-6">
            <v-col
                v-for="project in projects"
                :key="project.title"
                cols="4"
            >
                <Card
                    :title="project.title"
                    :date="project.date"
                    :description="project.description"
                    :logo="project.logo"
                    :image="project.image"
                />
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
      title: 'My Web Site',
      date: '25/01/2022',
      description: 'This is my personnal web site',
      logo: 'mdi-vuejs',
      image: 'web-page.png',
    },
    {
      title: 'ASCII filter',
      date: '04/07/2021',
      description: 'Add an ASCII filter on your camera',
      logo: 'mdi-language-python',
    },
    {
      title: 'Ray-Tracing',
      date: '13/09/2021',
      description: 'Ray-Tracing engine for simple scenes',
      logo: 'mdi-language-cpp',
    },
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
