import Vue from 'vue';

export default Vue.component('ButtonComponent', {
  props: {
    isDisabled: {
      type: Boolean,
    },
  },
  template: `<button class="button" :disabled="isDisabled"  @click="(event) => this.$emit('fetchUserTimeline')"><slot /></button>`,
});
