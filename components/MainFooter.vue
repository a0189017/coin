<template>
  <footer class="mainFooter">
    <ul class="mainHeaderList">
      <li v-for="(item, ind) in links" :key="ind">
        <a :href="item.url" target="_blank">{{ item.text }}</a>
        <span v-if="ind!=6"> | </span>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
          {
            "text":"footer",
            "url":"#",
          },
          {
            "text":"BTC At Work",
            "url":"#",
          },
          {
            "text":"Cryptodollars",
            "url":"#",
          },
          {
            "text":"Lending",
            "url":"#",
          },
          {
            "text":"Earn Income",
            "url":"#",
          },
          {
            "text":"The Coin List",
            "url":"#",
          },
          {
            "text":"Blog",
            "url":"#",
          },
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.mainFooter
  width: 100%
  display: flex
  justify-content: center
  text-align: center
  align-items: center
  font-weight: 400
  font-size: 0.7rem
  z-index: 999
  min-height: 70px
  li
    margin-left: 15px
    display: inline-block
@media only screen and (max-width: 960px)
  .mainFooter
    position: relative
    width: 100%
    transform: none
    left: auto
    text-align: center

</style>
