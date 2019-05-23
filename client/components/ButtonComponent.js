import Vue from 'vue';

export default Vue.component('ButtonComponent', {
  template: `<button @click="(event) => this.$emit('fetchUserTimeline')"><slot /></button>`,
});
