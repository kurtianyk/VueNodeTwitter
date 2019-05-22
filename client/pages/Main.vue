<template>
  <div class="main-page">
    <input v-model="handle" />
    <button @click="fetchUserTimelineByHandle()">Find</button>
    <ul v-if="timeline.length">
      <li v-for="twitt in timeline" v-bind:key="twitt.id">{{ twitt}}</li>
    </ul>
  </div>
</template>

<script>
import API from '@/services/api.js';

export default {
  data() {
    return {
      handle: '',
      timeline: [],
    };
  },
  methods: {
    async fetchUserTimelineByHandle() {
      const timeline = await API.getUserTimeline(this.handle);
      this.timeline = timeline;
    },
  },
}
</script>

<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
