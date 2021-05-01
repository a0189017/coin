<template>
  <div class="errorPageContainer">
    <div
      class="errorImg"
      :style="{
        backgroundImage: `url(https://i.gbc.tw/gb_tw/static/site/404-2x.png)`,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head() {
    return {
      title: 'error',
    };
  },
};
</script>
<style lang="sass" scope>
.errorPageContainer
  padding-top: 120px
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
.errorImg
  width: 30%
  background-repeat: no-repeat
  padding-top: 16.8%
  flex: 0 0 auto
  background-position: center
  background-size: cover


@media screen and (max-width: 640px)
  .errorImg
    width: 50%
    background-repeat: no-repeat
    padding-top: 28%
</style>
