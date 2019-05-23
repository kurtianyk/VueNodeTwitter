<template>
  <div class="main-page-wrapper">
    <h1>Twitter Timeline</h1>
    <input-field
      :value="handle"
      @inputChange="handleChange"
    />
    <button-component @fetchUserTimeline="fetchUserTimelineByHandle">Search</button-component>
    <ul v-if="timeline.length">
      <li v-for="twitt in timeline" v-bind:key="twitt.id">{{ twitt}}</li>
    </ul>
  </div>
</template>

<script>
import API from '@/services/api.js';
import InputField from '@/components/InputField';
import ButtonComponent from '@/components/ButtonComponent';

export default {
  components: {
    InputField,
    ButtonComponent
  },
  data() {
    return {
      handle: '',
      timeline: [],
    };
  },
  methods: {
    async fetchUserTimelineByHandle() {
      console.log(this.handle, 'handle');
      const timeline = await API.getUserTimeline(this.handle);
      this.timeline = timeline;
    },
    handleChange(value) {
      this.handle = value;
    },
  },
}
</script>
