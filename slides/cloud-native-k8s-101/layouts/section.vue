<script setup lang="ts">
defineProps<{
  act?: string
}>()
</script>

<template>
  <div class="slidev-layout section">
    <p v-if="act" class="section-number">{{ act }}</p>
    <slot />
  </div>
</template>
