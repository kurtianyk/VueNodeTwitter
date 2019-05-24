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
    <ul class="tweets-timeline" v-if="timeline.length">
      <tweet-item 
        v-for="tweet in timeline"
        :key="tweet.id"
        :tweet="tweet"
      />
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';

import API from '@/services/api.js';
import InputField from '@/components/InputField';
import ButtonComponent from '@/components/ButtonComponent';
import TweetItem from '@/components/TweetItem';

export default {
  components: {
    InputField,
    ButtonComponent,
    TweetItem,
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
