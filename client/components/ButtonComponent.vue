<template functional>
  <button class="button" :disabled="props.isDisabled"  @click="listeners.fetchUserTimeline">
    <slot />
  </button>
</template>
