<template>
  <div>
    <Header />
    <Board />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './Header.vue';
import Board from './Board.vue';

@Component({
  components: {
    Header,
    Board,
  },
})
export default class Home extends Vue { }

</script>
