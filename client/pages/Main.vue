<template>
  <div class="main-page">
    <input v-model="handle" />
    <button @click="fetchUserTimelineByHandle()">Find</button>
  </div>
</template>

<script>
import API from '@/services/api.js';

export default {
  data() {
    return {
      handle: '',
    };
  },
  methods: {
    async fetchUserTimelineByHandle() {
      console.log(this.handle, 'handle');
      const timeline = await API.getUserTimeline(this.handle);
      console.log(timeline, 'timeline');
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
