<template>
  <div>
    <h1>Coin's World</h1>
    <div class='coinIndexCotain'>
      <div class='coinBlog'>
        <div>
          Founder Fireside Chat with Sunil Srivatsa of Saddle
          <a href="#"> Read on the DeFi Pulse Blog ▶</a>
        </div>
      </div>
      <div class='coinMarketContain'>
        <div class='coinMarketLeft'>
          <div class='coinMarketLeftBox coinMarketLeftTotal'>
            <h2>Total Value Locked (USD)</h2>
            <span>$58.78B</span>
          </div>
          <div class='coinMarketLeftBox coinMarketLeftDominance'>
            <h2>Maker Dominance</h2>
            <span>16.33%</span>
          </div>
          <div class='coinMarketLeftBox coinMarketLeftIndex'>
            <h2>DeFi Pulse Index</h2>
            <span>
              472.07
              <div class='coinMarketLeftSubIndex coinIncrease'>
                +69.54
                </br>
                (+17.28%)
              </div>
            </span>
          </div>
        </div>
        <div class='coinMarketRight'>
          <div class='coinMarketRightChart'>
            <div class='coinChartsHeader'>
              <p class='coinChartsTitle'>Total Value Locked (USD) in coin</p>
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
            <span>Ever consider working in DeFi? Now's your chance to contribute your talents.</span>
            <a href="#">Apply today</a>
          </div>
        </div>
      </div>
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
              <div class='item-name'>Rank</div>
              <div class='item-title'>Name</div>
              <div class='item-title itemMobileHidden'>Volume 7d (USD)</div>
              <div class='item-priceprice itemMobileHidden'>Last 7d sales</div>
              <div class='item-title'>Volume all time (USD)</div>
              <div class='item-price'>All time sales</div>
            </li>
            <a href='/detail' class='list-item flex-row' v-for="(item,key) in rankList">
              <div class='item-name'>{{ key+1 }}</div>
              <div class='item-title'>{{ item.Name }}</div>
              <div class='item-title itemMobileHidden'>{{ item.Volume7d }}</div>
              <div class='item-price itemMobileHidden'>{{ item.Last7dsales }}</div>
              <div class='item-title'>{{ item.Volumealltime }}</div>
              <div class='item-price' :class='item.color'>{{ item.Alltimesales }}</div>
            </a>
          </ul>
        </div>
      </div>
      <div class='coinFAQ'>
        <h3>What is DeFi?</h3>
        <p>DeFi is an abbreviation of the phrase decentralized finance which generally refers to digital assets and financial smart contracts, protocols, and decentralized applications (DApps), most of which are built on Ethereum. In simpler terms, it's financial software built on the blockchain that can be pieced together like Money Legos. Read more about DeFi.</p>
        <h3>What’s the purpose of DeFi Pulse?</h3>
        <p>DeFi Pulse is a site where you can find the latest analytics and rankings of DeFi protocols. Our rankings track the total value locked into the smart contracts of popular DeFi applications and protocols. Additionally, we curate The DeFi List, a collection of the best resources in DeFi, and DeFi Pulse Farmer, a newsletter covering the latest news and opportunities in DeFi.</p>
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
      searchBoxHidden:'is_hidden',
      metrics:[
        {"Name":'TVL (USD)',"acted":1},
        {"Name":'ETH',"acted":0},
        {"Name":'BTC',"acted":0},
      ],
      timescales:[
        {"Name":'All',"acted":1},
        {"Name":'1 Year',"acted":0},
        {"Name":'90 Day',"acted":0},
        {"Name":'30 Day',"acted":0},
      ],
      cointCategoryItem:[
        {"Name":'Lending',"acted":0},
        {"Name":'DEXes',"acted":0},
        {"Name":'Derivatives',"acted":0},
        {"Name":'Payments',"acted":0},
        {"Name":'Assets',"acted":0},
      ],
      rankList:[
        {
          "Rank":"1",
          "Name":"Maker",
          "Chain":"Ethereum",
          "Category":"Lending",
          "Locked":"$9.52B",
          "price":"1%",
          "color":"coinIncrease"
        },
        {
          "Rank":"2",
          "Name":"Compound",
          "Chain":"Ethereum",
          "Category":"Lending",
          "Locked":"$9.52B",
          "price":"-1%",
          "color":"coinDecrease"
        },
        {
          "Rank":"3",
          "Name":"Aave",
          "Chain":"Ethereum",
          "Category":"Lending",
          "Locked":"$9.52B",
          "price":"-100%",
          "color":"coinDecrease"
        },
      ],
      chartdataloaded:{
        labels: [], // 位於 x 軸的各筆數據 key
        datasets: []
      },
      chartOptions:{
        responsive: true,
        maintainAspectRatio: false,
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
        ]
        }
      }
    }
  },
	async created() {
		let msg = await axios.get('http://nft-test.blocktempo.com:3001/api/cap/monthbyName?name=CryptoPunks&chain=ethereum');
    let chartData=[];
    let serises=msg.data.series;
    for(var key in serises){
      chartData.push({label:serises[key]['name'],fill: false,borderColor: 'rgb(75, 192, 192)',data:serises[key]['data']});
    }
    this.chartdataloaded = { datasets:chartData, labels: msg.data.xaxis };
	},
  methods:{
    changeCategory(key){
      if(this.cointCategoryItem[key]['acted']==1){
      this.cointCategoryItem =[{"Name":'Lending',"acted":0},{"Name":'DEXes',"acted":0},{"Name":'Derivatives',"acted":0},{"Name":'Payments',"acted":0},{"Name":'Assets',"acted":0},];
      }
      else{
        this.cointCategoryItem =[{"Name":'Lending',"acted":0},{"Name":'DEXes',"acted":0},{"Name":'Derivatives',"acted":0},{"Name":'Payments',"acted":0},{"Name":'Assets',"acted":0},];
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
    }
  }
}

</script>

<style lang="sass">
@import "@/assets/sass/page/index.sass";
</style>

