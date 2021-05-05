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
import axios from 'axios';
export default {
  data() {
    return {
      links: [],
    };
  },
  async mounted() {
    let pageAPI = await axios.get('http://nft-test.blocktempo.com:3001/api/cap/page');
    let pageDatas=pageAPI.data.data[0];

    this.links.push({text:'API',url:pageDatas.API},{text:'Advertise',url:pageDatas.Advertise},{text:'Feedback',url:pageDatas.Feedback},{text:'Blog',url:pageDatas.Blog},{text:'Telegram',url:pageDatas.Telegram},{text:'Twitter',url:pageDatas.Twitter},{text:'Discord',url:pageDatas.Discord});
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
