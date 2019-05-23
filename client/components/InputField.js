import Vue from 'vue';

export default Vue.component('InputField', {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  template: `
    <div class="input-wrapper">
      <input
        class="input-field"
        :value="value"
        :placeholder="placeholder"
        @input="(event) => this.$emit('inputChange', event.target.value)"
      />
    </div>
  `,
});
