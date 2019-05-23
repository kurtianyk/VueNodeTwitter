import Vue from 'vue';

export default Vue.component('InputField', {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  template: `
    <input
      :value="value"
      @input="(event) => this.$emit('inputChange', event.target.value)"
    />
  `,
});
