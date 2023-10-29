<template>
    <div class="wrapper" ref="element">
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { run } from '../stackattack'
const element = ref();
onMounted(() => {
    run(element.value);
})
</script>
<style lang="scss">
.wrapper {
    display: flex;
    height: 100vh;
    overflow: hidden;

    * {
        margin: auto;
        transform: scale(10);

        /** DISABLE ANTIALIASING ***/
        image-rendering: optimizeSpeed;
        /* STOP SMOOTHING, GIVE ME SPEED  */
        image-rendering: -moz-crisp-edges;
        /* Firefox                        */
        image-rendering: -o-crisp-edges;
        /* Opera                          */
        image-rendering: -webkit-optimize-contrast;
        /* Chrome (and eventually Safari) */
        image-rendering: pixelated;
        /* Universal support since 2021   */
        image-rendering: optimize-contrast;
        /* CSS3 Proposed                  */
        -ms-interpolation-mode: nearest-neighbor;
        /* IE8+   */
    }
}
</style>
    