<template>
  <header class="mainHeaderList">
    <a v-for="(item, ind) in links" :key="ind" :href="item.url" target="_blank">{{ item.text }}</a>
  </header>
</template>

<script>
import callApi from '@/plugins/callApi'
export default {
  name: 'MainNav',
  data() {
    return {
      links: [
          {
            "text":"Home",
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
    }
  },
  
  async mounted() {
    
  },

}
</script>

<style lang="sass" scoped>
.mainHeaderList
  font-size: 14px
  font-weight: 400
  position: absolute
  width: fit-content
  left: 50%
  transform: translateX(-50%)
  top: 13px
  display: block
  a
    display: inline-block
    white-space: nowrap
    margin-bottom: 6px
    border-right: 1px solid black
    padding-right: 10px
    margin-right: 10px
@media only screen and (max-width: 960px)
  .mainHeaderList
    position: relative
    width: 100%
    transform: none
    left: auto
    text-align: center

</style>
