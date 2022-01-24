<template>
    <v-container>
        <v-row justify="space-around" class="mt-6">
            <v-col cols=4>
                <Card />
            </v-col>
            <v-col cols=4>
                <Card />
            </v-col>
            <v-col cols=4>
                <Card />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from './Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class Board extends Vue {}

</script>
