<template>
<div class="wrapper" ref="element">
</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { run } from '../arvolleyball'
const element = ref();
onMounted(() => {
  run(element.value);
})
</script>
<style>
body {
  color: slateblue;
  font-family: sans-serif;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #333;
}
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.lcd-game {
  object-fit: contain;
  object-position: center;
  width: 100vw;
  height: 100vw;
}

.lcd-background,
.lcd-screen {
  position: absolute;
  left: calc(50% - 280px);
  width: 561px;
  height: 718px;
  transform: scale(0.45) translateY(-160px) translateX(-40px);
}

.lcd-background {
  z-index: 1;
}

.lcd-screen {
  z-index: 2;
}

.info {
  background: rgb(33, 33, 33);
  color: white;
  position: absolute;
  left: 10%;
  top: 10%;
  padding: 1em;
  border-radius: 30%;
}

</style>
