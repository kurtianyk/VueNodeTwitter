<template>
  <div class="main-page-wrapper">
    <h1 class="main-page-header">Twitter Timeline</h1>
    <div class="main-page-form">
      <div class="at">@</div>
      <input-field
        :value="handle"
        placeholder="username"
        @inputChange="handleChange"
      />
      <button-component :isDisabled="!canSearchUser" @fetchUserTimeline="fetchUserTimelineByHandle">Search</button-component>
    </div>
    <ul v-if="timeline.length">
      <li v-for="twitt in timeline" v-bind:key="twitt.id">{{ twitt}}</li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';

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
      canSearchUser: false,
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
      this.canSearchUser = !_.isEmpty(this.handle);
    },
  },
}
</script>
