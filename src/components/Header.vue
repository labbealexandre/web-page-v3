<template>
    <v-container fluid>
        <v-row align="center" id="header">
            <v-col >
                <v-row justify="center">
                    <h1 class="secondary--text display-4">
                        Alexandre Labbé
                    </h1>
                </v-row>
                <v-row justify="center" class="mt-8">
                    <h1 class="secondary--text display-2">
                        IT Security Consultant
                    </h1>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}

</script>

<style scoped>
#header {
    height: 100vh;
    background-color: var(--v-primary-base)
}
</style>
