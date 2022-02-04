<template>
    <div id="background">
        <div id="device">
            <div id="camera"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class MobileLandscape extends Vue {}

</script>

<style scoped>
#background {
    height: 100vh;
    width: 100vw;
    background-color: var(--v-primary-base);
    display: flex;
    justify-content: center;
    align-items: center;
}

#device {
    height: 20vw;
    width: 20vh;
    border-style: solid;
    border-color: var(--v-secondary-base);
    border-width: 0.5em;
    border-radius: 0.5em;
    animation: rotate 1.5s ease-in-out infinite alternate;
}

#camera {
    position: relative;
    top: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 10px;
    width: 10px;
    background-color: var(--v-secondary-base);
    border-radius: 5px;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg)
    }
    50% {
        transform: rotate(-90deg)
    }
    100% {
        transform: rotate(-90deg)
    }
}

</style>
