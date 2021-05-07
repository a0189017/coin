<template>
  <div>
    <div class='coinIndexCotain'>
      <div class='coinBlog'>
        <div>
          {{Disclaimerfront}}
          <a :href="Disclaimerback"> Read more ▶</a>
        </div>
      </div>
      <div class='coinMarketContain'>
        <div class='coinMarketLeft'>
          <div class='coinMarketLeftBox coinMarketLeftTotal'>
            <h2>{{Title1}}</h2>
            <span>{{blockAll}}</span>
          </div>
          <div class='coinMarketLeftBox coinMarketLeftDominance'>
            <h2>{{Title2}}</h2>
            <span>{{blockEth}}</span>
          </div>
          <div class='coinMarketLeftBox coinMarketLeftIndex'>
            <h2>{{Title3}}</h2>
            <span>
              {{blockAllTxns}}
              <!-- <div class='coinMarketLeftSubIndex coinIncrease'>
                +69.54
                </br>
                (+17.28%)
              </div> -->
            </span>
          </div>
        </div>
        <div class='coinMarketRight'>
          <div class='coinMarketRightChart'>
            <div class='coinChartsHeader'>
              <p class='coinChartsTitle'>{{Title4}}</p>
              <div class='coinChartsOption'>
                <ul class='coinChartsMetrics'>
                  <li v-for="(item,key) in metrics" @click='metricsChange(key)'>
                    <span class='option' :class="{ option_acted: item.acted }">{{ item.Name }} </span>|
                  </li>
                </ul>
                <ul class='coinChartsTimescales'>
                  <li v-for="(item,key) in timescales" @click='timescalesChange(key)'>
                    <span class='option' :class="{ option_acted: item.acted }">{{ item.Name }} </span>|
                  </li>
                </ul>
              </div>
            </div>
            <chart :chart-data='chartdataloaded' :options='chartOptions' class='chartBox' />
          </div>
          <div class='coinMarketRightAdv'>
            <span>{{Disclaimerf2}}</span>
            <a :href="Disclaimerb2">Subscribe Us</a>
          </div>
        </div>
      </div>
      <a class='coinAd' :href="ADLink" target='_blank'>
        <img :src='ADImage'>
      </a>
      <div class='coinCategoryList'>
        <div 
          class='cointCategoryItem' 
          v-for="(item,key) in cointCategoryItem" 
          @click='changeCategory(key)'
          :class="{ is_acted: item.acted }"
          >
          {{ item.Name }}
        </div>
        <div class='cointCategorySearch'>
          <div>
            <input type="text" name="search" @blur='coinSearchBlur' @mousedown='coinSearchShow'>
            <div class='searchBox' :class='searchBoxHidden'>
              <ul class='searchResult'>
                <li class='searchItem'>123</li>
                <li class='searchItem'>456</li>
                <li class='searchItem'>789</li>
              </ul>
            </div>
          </div>
          <span class='searchIcon'>
            <fa icon="search" />
          </span>
        </div>
      </div>
      <div class='coinBottomContain'>
        <div class='coinButtomData'>
          <ul class='list-wrap'>
            <li class='list-item flex-row'>
              <div class='item-name'>Collection</div>
            </li>
            <a href='/detail' class='list-item flex-row' v-for="(item,key) in rankList">
              <div class='item-name'>{{item.Collection}}</div>
            </a>
          </ul>
          <ul class='list-wrap list-scroll'>
            <li class='list-item flex-row list-index'>
              <div class='item-status'>Rank</div>
              <div class='item-img'></div>
              <div class='item-name'>Collection</div>
              <div class='item-priceprice'>Chain</div>
              <div class='item-name'>Category</div>
              <div class='item-price'>Sales</div>
              <div class='item-price'>24H %</div>
              <div class='item-price'>7D %</div>
              <div class='item-price'>Txns (24H)</div>
              <div class='item-price'>Traders (24H)</div>
            </li>
            <a href='/detail' class='list-item flex-row list-index' v-for="(item,key) in rankList">
              <div class='item-status'>{{ key+1 }}</div>
              <div class='item-img'><img class='img-cover' :src='item.Thumbnail'></div>
              <div class='item-name'>{{item.Collection}}</div>
              <div class='item-priceprice'>{{item.Chain}}</div>
              <div class='item-name'>{{item.Category}}</div>
              <div class='item-price'>{{item.Sales}}</div>
              <div class='item-price'>{{item.H24}}</div>
              <div class='item-price'>{{item.D7}}</div>
              <div class='item-price'>{{item.Txns}}</div>
              <div class='item-price'>{{item.Traders}}</div>
            </a>
          </ul>
        </div>
      </div>
      <div class='coinFAQ'>
        <h3>{{mtitle1}}</h3>
        <p>{{mdisc1}}</p>
        <h3>{{mtitle2}}</h3>
        <p>{{mdisc2}}</p>
        <h3>{{mtitle3}}</h3>
        <p>{{mdisc3}}</p>
        <h3>{{mtitle4}}</h3>
        <p>{{mdisc4}}</p>
        <h3>{{mtitle5}}</h3>
        <p>{{mdisc5}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Charts from '@/components/Chart'
import callApi from '@/plugins/callApi'
import axios from 'axios'
export default {
  components: {
    Charts
  },
  data(){
    return {
      Title1:'',
      Title2:'',
      Title3:'',
      Title4:'',
      Disclaimerfront:'',
      Disclaimerback:'',
      Disclaimerf2:'',
      Disclaimerb2:'',
      mtitle1:'',
      mdisc1:'',
      mtitle2:'',
      mdisc2:'',
      mtitle3:'',
      mdisc3:'',
      mtitle4:'',
      mdisc4:'',
      mtitle5:'',
      mdisc5:'',
      blockAll:'',
      blockEth:'',
      blockAllTxns:'',
      ADImage:'',
      ADLink:'',
      timeout:'',
      searchBoxHidden:'is_hidden',
      metrics:[
        {"Name":'TVL (USD)',"acted":1},
        {"Name":'ETH',"acted":0},
        {"Name":'BTC',"acted":0},
      ],
      timescales:[
        {"Name":'24H',"acted":1},
        {"Name":'7D',"acted":0},
        {"Name":'30D',"acted":0},
        {"Name":'All Time',"acted":0},
      ],
      cointCategoryItem:[
        {"Name":'flow',"acted":0},
        {"Name":'eth',"acted":0},
        {"Name":'wax',"acted":0},
        {"Name":'bsc',"acted":0},
        {"Name":'Polygon',"acted":0},
      ],
      rankList:[],
      chartdataloaded:{
        labels: [], // 位於 x 軸的各筆數據 key
        datasets: []
      },
      chartOptions:{
        responsive: true,
        maintainAspectRatio: false,
        elements:{
          point:{
              radius:0
          }
        },
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false
         },
        hover: {
          mode: 'index',
          intersect: false
        },
        scales: {
          yAxes: [
          {
            ticks: {
              precision: 0
            }
          }
          ],
          xAxes: [
          {
            ticks: {
              type: 'category',
              maxRotation: 2,
              autoskip: false ,
              autoSkipPadding: 100 ,
              precision: 0
            }
          }
          ]
        }
      }
    }
  },
	async created() {
    this.indexDataFromAPI();
    this.timeout=setInterval(() => {this.indexDataFromAPI();},300000);
	},
  beforeDestroy () {
    clearInterval(this.timeout)
  },
  methods:{
    changeCategory(key){
      if(this.cointCategoryItem[key]['acted']==1){
      this.cointCategoryItem =[{"Name":'flow',"acted":0},
        {"Name":'eth',"acted":0},
        {"Name":'wax',"acted":0},
        {"Name":'bsc',"acted":0},
        {"Name":'Polygon',"acted":0}];
      }
      else{
        this.cointCategoryItem =[{"Name":'flow',"acted":0},
        {"Name":'eth',"acted":0},
        {"Name":'wax',"acted":0},
        {"Name":'bsc',"acted":0},
        {"Name":'Polygon',"acted":0}];
        this.cointCategoryItem[key]['acted']=1;
      }
    },
    metricsChange(key){
      this.metrics=[
        {"Name":'TVL (USD)',"acted":0},
        {"Name":'ETH',"acted":0},
        {"Name":'BTC',"acted":0},
      ];
      this.metrics[key]['acted']=1;
    },
    timescalesChange(key){
      this.timescales=[
        {"Name":'All',"acted":0},
        {"Name":'1 Year',"acted":0},
        {"Name":'90 Day',"acted":0},
        {"Name":'30 Day',"acted":0},
      ];
      this.timescales[key]['acted']=1;
    },
    coinSearchBlur(){
      setTimeout(() => {this.searchBoxHidden='is_hidden';}, 400);
    },
    coinSearchShow(){
      this.searchBoxHidden='';
    },
    async indexDataFromAPI(){
      let chartAPI = await axios.get('http://nft-test.blocktempo.com:3001/api/cap/chart');
      let chartDatas=chartAPI.data.data;
      let chartData=[];
      chartData.push({label:'',fill: false,borderColor: 'rgb(75, 192, 192)',data:chartDatas[0]});
      this.chartdataloaded = { datasets:chartData, labels: chartDatas[1] };
      let pageAPI = await axios.get('http://nft-test.blocktempo.com:3001/api/cap/page');
      let pageDatas=pageAPI.data.data[0];
      this.Title1=pageDatas.Title1;
      this.Title2=pageDatas.Title2;
      this.Title3=pageDatas.Title3;
      this.Title4=pageDatas.Title4;
      this.Disclaimerfront=pageDatas.Disclaimerfront;
      this.Disclaimerback=pageDatas.Disclaimerback;
      this.Disclaimerf2=pageDatas.Disclaimerf2;
      this.Disclaimerb2=pageDatas.Disclaimerb2;
      this.mtitle1=pageDatas.mtitle1;
      this.mdisc1=pageDatas.mdisc1;
      this.mtitle2=pageDatas.mtitle2;
      this.mdisc2=pageDatas.mdisc2;
      this.mtitle3=pageDatas.mtitle3;
      this.mdisc3=pageDatas.mdisc3;
      this.mtitle4=pageDatas.mtitle4;
      this.mdisc4=pageDatas.mdisc4;
      this.mtitle5=pageDatas.mtitle5;
      this.mdisc5=pageDatas.mdisc5;
      this.ADImage=pageDatas.ADImage;
      this.ADLink=pageDatas.ADLink;
      let blockAPI = await axios.get('http://nft-test.blocktempo.com:3001/api/cap/block');
      let blockDatas=blockAPI.data.data;
      this.blockAll=blockDatas.all;
      this.blockEth=blockDatas.eth;
      this.blockAllTxns=blockDatas.allTxns;
      let tableAPI = await axios.get('http://nft-test.blocktempo.com:3001/api/cap/table');
      let tableDatas=tableAPI.data.data;
      this.rankList=tableDatas;
    }
  }
}

</script>

<style lang="sass">
@import "@/assets/sass/page/index.sass";
</style>

