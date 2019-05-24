<template>
  <div class="input-wrapper">
      <input
        class="input-field"
        :value="value"
        :placeholder="placeholder"
        v-on="listeners"
      />
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  computed: {
    listeners () {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('inputChange', event.target.value)
      }
    }
  }
}
</script>
