<template>
    <v-hover v-slot="{ hover }">
        <v-card tile elevation="0" outlined>
            <v-img
                height="350"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
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
                            mdi-language-python
                        </v-icon>
                    </div>
                </v-expand-transition>
            </v-img>
            <v-card-text
                class="pt-6"
                style="position: relative;"
            >
                <div class="font-weight-light grey--text text-h6 mb-2">
                    24/01/2022
                </div>
                <h3 class="text-h4 font-weight-light primary--text mb-2">
                    Side project
                </h3>
                <div class="font-weight-light text-h6 mb-2">
                    Our Vintage kitchen utensils delight any chef.<br>
                    Made of bamboo by hand
                </div>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
    hover = false
}

</script>

<style scoped>

.card-hover {
    opacity: 0.65;
}

</style>
