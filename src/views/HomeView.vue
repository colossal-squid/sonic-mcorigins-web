<script setup lang="ts">
</script>

<template>
  <main>
    <header>
      <h1>Let's play some LCD games</h1>
      <nav>
        <RouterLink class="link" to="/arvolleyball">
          <img class="game-preview" src="/arvolleyball/arvolleyball_front.jpg" alt="Amy and Rouge volleyball" />
          Amy and Rouge volleyball
        </RouterLink>
      </nav>
    </header>
  </main>
</template>

<style>
.link {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-preview {
  width: 200px;
  height: auto;
}
</style>
