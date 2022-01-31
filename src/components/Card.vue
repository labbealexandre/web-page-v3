<template>
    <v-hover v-slot="{ hover }">
        <v-card tile elevation="0" outlined>
            <v-img
                height="350"
                :src="require(`../assets/${image}`)"
            >
                <v-expand-transition>
                    <div
                        v-if="hover"
                        class="
                            d-flex
                            justify-center
                            transition-fast-in-fast-out
                            primary
                            darken-2
                            v-card--reveal
                            text-h2
                            white--text
                            card-hover
                        "
                       style="height: 100%;"
                    >
                        <v-icon
                            dark
                            size="150"
                        >
                            {{ logo }}
                        </v-icon>
                    </div>
                </v-expand-transition>
            </v-img>
            <v-card-text
                class="pt-6"
                style="position: relative;"
            >
                <div class="font-weight-light grey--text text-h6 mb-2">
                    {{ date }}
                </div>
                <a :href="url" class="text-decoration-none">
                    <h3 class="text-h4 font-weight-light primary--text mb-2">
                        {{ title }}
                    </h3>
                </a>
                <div class="font-weight-light text-h6 mb-2">
                    {{ description }}
                </div>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const CardProps = Vue.extend({
  props: {
    title: String,
    date: String,
    description: String,
    logo: String,
    image: {
      default: 'not-found.png',
      type: String,
    },
    url: {
      default: 'https://github.com/labbealexandre',
      type: String,
    },
  },
});

@Component
export default class Card extends CardProps {
    hover = false
}

</script>

<style scoped>

.card-hover {
    opacity: 0.65;
}

</style>
