<template>
  <li class="tweet">
    <div class="avatar">
      <a :href="`https://twitter.com/${tweet.user.screen_name}`"><img :src="tweet.user.profile_image_url" /></a>
    </div>
    <div class="tweet-info">
      <div>
        <b><a class="author" :href="`https://twitter.com/${tweet.user.screen_name}`">{{tweet.user.name}}</a></b>{{' '}}<br>
        <a class="author" :href="`https://twitter.com/${tweet.user.screen_name}`">@{{tweet.user.screen_name}}</a> | {{tweet.created_at.slice(0, 10)}}
      </div>
      <p class="tweet-text">{{tweet.text}}</p>
      <p>
        <b>Likes:</b> {{tweet.favorite_count}} | <b>Retweets:</b> {{tweet.retweet_count}}
      </p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    tweet: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
/* TRYING TO USE SINGLE FILE COMPONENT STYLES */

  @import '@/styles/variables.scss';

  .tweet {
    border: solid;
    border-radius: 5px;
    border-color: $color-blue;
    width: 79%;
    margin: 0 auto;
    margin-top: 25px;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
    font-family: $font-family-secondary;
    .avatar {
      width: 50px;
      height: auto;
      float: left;
      margin-right: 2px;
      border-radius: 50%;
      img {
        border-radius: 50%;
      }
    }
    .tweet-info {
      div {
        margin-bottom: 20px;
        box-sizing: border-box;
        a {
          &:link, &:visited {
            text-decoration: none;
            background-color: transparent;
            color: black;
            font-size: 1.3em;
          }
          &:hover {
            color: $color-blue;
          }
        }
      }
      .tweet-text {
        margin: 15px auto;
      }
      b {
        font-weight: bold;
      }
    }
  }

</style>
