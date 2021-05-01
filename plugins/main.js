import Vue from 'vue';
import callApiFun from '@/plugins/callApi';

Vue.mixin({
  data() {
    return {
      MEMBER_URL: process.env.memberUrl,
      GB_LOG_URL: process.env.gbLogUrl,
    };
  },
  methods: {
    pageClick(page){
      this.currentPage = page<=this.totalPages ?page:this.totalPages;
      this.currentPage = this.currentPage>0 ?this.currentPage:1;
      this.changePage();
    },
    pageChangeCount(){
      let vm=this;
      vm.pages=[];
      let pageCount=0;
      let firstPage= vm.currentPage-2>0?vm.currentPage-2:1;
      for(var i=firstPage;i<=vm.totalPages;i++){
        if(pageCount==6){
          break;
        }
        else{
          let acted = i==vm.currentPage?'is_acted':'';
          vm.pages.push({page:i,acted:acted});
          pageCount++;
        }
      }
    },
    changePageByScrollY(scrollY, url, param = {}) {
      let vm = this;
      if (vm.currentPage == vm.prevPage) {
        return;
      }
      let newPage = 1;
      for(let ind = vm.scrollTops.length - 1; ind > 0; ind--) {
        if (scrollY >= vm.scrollTops[ind]) {
          newPage = parseInt(ind) + 1;
          break;
        }
      }
      if (newPage == vm.$route.query.page) {
        return;
      }
      var params = param;
      params.page = newPage;
      vm.$router.push({
        path: url,
        query: params,
      });
    },
    async callApi(apiUrl, gbDataObj, headers = {}) {
      return await callApiFun(apiUrl, gbDataObj, headers);
    },
    callFunByName(function_name) {
      this[function_name]();
    },

    getHeaderHeight() {
      var header = document.getElementsByClassName("mainHeader");
      var header_height = header[0] ? header[0].getBoundingClientRect().height : 0;
      if (document.getElementsByClassName("smart-banner") && document.getElementsByClassName("smart-banner")[0]) {
        var smart_banner_height = document.getElementsByClassName("smart-banner")[0].getBoundingClientRect().height;
        header_height += smart_banner_height;
      }
      return header_height;
    },
    padding(str, fullLength = 2, pad_str = '0', type = 'left') {
      if ((str + "").length >= fullLength) {
        return str;
      }
      if (type == 'right') {
        str = str + pad_str;
        return this.padding(str, fullLength);
      }
      str = pad_str + str;
      return this.padding(str, fullLength);
    },
    dateFormat(dateStr, isChinese = false, isTime = false, isSecond = false) {
      let date = dateStr,
          yearStr = '-',
          monthStr = '-',
          dayStr = '',
          splitStr = ' ',
          hourStr = ':',
          minuteStr = ':',
          secStr = '';
      if (dateStr instanceof Date === false) {
        date = new Date(dateStr.replace(/-/g, "/"));
      }
      if (isChinese) {
        yearStr = '年';
        monthStr = '月';
        dayStr = '日';
        hourStr = '時';
        minuteStr = '分';
        secStr = '秒';
      }
      let str = date.getFullYear() + yearStr + this.padding(date.getMonth() + 1) + monthStr + this.padding(date.getDate()) + dayStr;
      if (isTime) {
          str += splitStr + this.padding(date.getHours()) + hourStr + this.padding(date.getMinutes()) + (isChinese ? minuteStr : "");
          if (isSecond) {
            str += (isChinese ? "" : minuteStr) + this.padding(date.getSeconds()) + secStr;
          }
      }
      return str;
    },
    arrayColumn(array, columnName) {
      //當陣列的每一筆object都有columnName時取得以columnName的值產生的一圍陣列
      return array.map(function(value,index) {
        return value[columnName];
      });
    },
    arrayFlip(trans) {
      //將物件的key與value互換位置
      let key
      let arr = {}
      for (key in trans) {
        if (!trans.hasOwnProperty(key)) {
          continue
        }
        arr[trans[key]] = key
      }
      return arr
    },
  }
})