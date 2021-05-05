<template>
  <header class="mainHeaderList">
    <div class='mainTop'>
      <a v-for="(item, ind) in links" :key="ind" :href="item.url" target="_blank" class='topList'>{{ item.text }}</a>
    </div>
    <div class="corner">
      <a :href='feedback'>feedback</a>
      <a :href='telegram' class='headerIcon'><fa :icon="['fab', 'telegram-plane']" /></a>
      <a :href='twitter' class='headerIcon'><fa :icon="['fab', 'twitter']" /></a>
      <a :href='discord' class='headerIcon'><fa :icon="['fab', 'discord']" /></a>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MainNav',
  data() {
    return {
      feedback:'',
      telegram:'',
      twitter:'',
      discord:'',
      links: [],
    }
  },
  
  async mounted() {
    let pageAPI = await axios.get('http://nft-test.blocktempo.com:3001/api/cap/page');
    let pageDatas=pageAPI.data.data[0];
    this.feedback=pageDatas.navfeedback;
    this.telegram=pageDatas.navtg;
    this.twitter=pageDatas.navtwi;
    this.discord=pageDatas.navdisc;

    this.links.push({text:'Home',url:pageDatas.Home},{text:'Art',url:pageDatas.Art},{text:'Defi',url:pageDatas.Defi},{text:'Metaverse',url:pageDatas.Metaverse},{text:'Sports',url:pageDatas.Sports},{text:'Collection',url:pageDatas.Collection});
  },

}
</script>

<style lang="sass" scoped>
.mainHeaderList
  width: 100%
  text-align: center
  .mainTop
    font-size: 14px
    font-weight: 400
    position: absolute
    width: fit-content
    left: 50%
    transform: translateX(-50%)
    top: 13px
  .topList
    display: inline-block
    white-space: nowrap
    margin-bottom: 6px
    border-right: 1px solid black
    padding-right: 10px
    margin-right: 10px
.corner
  position: absolute
  right: 15px
  top: 10px
  font-size: 14px
  text-decoration: none
  a
    margin-right: 8px
    color: black
  .headerIcon
    font-size: 27px
@media only screen and (max-width: 960px)
  .mainTop
    position: relative
    width: 100%
    transform: none
    left: auto
    text-align: center
  .corner
    position: relative
    padding-top: 40px
    width: 100%
    right: auto


</style>
