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
    <style>

    </style>
    