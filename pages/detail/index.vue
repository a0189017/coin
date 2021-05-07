<template>
  <div>
    <div class='indexCotainer'>
      <div class='coinTopBar'>
        <div class='coinKeystat'>
          <h2>Key Stats</h2>
          <ul class='list-wrap'>
            <li class='list-item flex-row'>
              <div class='item-title'>Total Value Locked  </div>
              <div class='item-name'></div>
              <div class='item-price'>24H</div>
            </li>
            <li class='list-item flex-row' v-for="(item,key) in KeyStatsList">
              <div class='item-price'>{{ item.name }}</div>
              <div class='item-price'>{{ item.price }}</div>
              <div class='item-price' :class='item.color'>{{ item.change }}</div>
            </li>
          </ul>
        </div>
        <div class='coinCharts'>
          <div class='chartsHeader'>
            <h2 class='chartsTitle'>Total Value Locked (USD) in Maker</h2>
            <div class='chartsControl'>
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
          <div class='chartsBody'>
            <chart :chart-data='chartdataloaded' :options='chartOptions' class='chartBox' />
          </div>
        </div>
      </div>
      <div class='coinMiddleBar'>
        <div class='coinMiddleLeftBar'>
          <div class='coinMiddleLeftContain'>
            <h2>Ecosystem Links</h2>
            <ul class='coinMiddleLeftList'>
              <li v-for="(item,key) in middleLeftTopList">
                <a :href="item.url" target="_blank">
                  {{ item.text }}
                </a>        
              </li>
            </ul>
          </div>
          <div class='coinMiddleLeftContain'>
            <h2>Audits</h2>
            <ul class='coinMiddleLeftList'>
              <li v-for="(item,key) in middleLeftDownList">
                <a :href="item.url" target="_blank">
                  {{ item.text }}
                </a>        
              </li>
            </ul>
          </div>
        </div>
        <div class='coinMiddleRightBar'>
            <h2>What is Maker?</h2>
            <p>MakerDAO is a decentralized credit platform on Ethereum that supports Dai, a stablecoin whose value is pegged to USD. Anyone can use Maker to open a Vault, lock in collateral such as ETH or BAT, and generate Dai as debt against that collateral. Dai debt incurs a stability fee (i.e., continuously accruing interest), which is paid upon repayment of borrowed Dai. That MKR is burned, along with the repaid Dai. Users can borrow Dai up to 66% of their collateral’s value (150% collateralization ratio). Vaults that fall below that rate are subject to a 13% penalty and liquidation (by anyone) to bring the Vault out of default. Liquidated collateral is sold on an open market at a 3% discount.
            </br>
            </br>
            Holders of Maker’s other token (MKR) govern the system by voting on, e.g., risk parameters such as the stability fee level. MKR holders also act as the last line of defense in case of a black swan event. If system-wide collateral value falls too low too fast, MKR is minted and sold on the open market to raise more collateral, diluting MKR holders.
            </br>
            </br>
            Maker also has a feature called the Dai Savings Rate (DSR). DAI holders can lock their DAI into Maker’s DSR contract and earn a variable interest rate in DAI, which is generated from stability fees.
            </p>
        </div>
      </div>
      <div class='coinBottomContain'>
        <h2>Maker Historical Stats</h2>
        <div class='coinButtomData'>
          <ul class='list-wrap'>
            <li class='list-item flex-row'>
              <div class='item-title'>Date</div>
              <div class='item-title'>TVL (USD)</div>
              <div class='item-title itemMobileHidden'>TVL Change</div>
              <div class='item-title itemMobileHidden'>Total ETH Locked</div>
              <div class='item-title'>ETH Locked 1d</div>
            </li>
            <li class='list-item flex-row' v-for="(item,key) in MakerHistoricalStats">
              <div class='item-title'>{{ item.Date }}</div>
              <div class='item-title'>{{ item.TVL }}</div>
              <div class='item-title itemMobileHidden' :class='item.TVLcolor'>{{ item.TVLChange }}</div>
              <div class='item-title itemMobileHidden'>{{ item.TotalETHLocked }}</div>
              <div class='item-title' :class='item.ETHLocked1dColor'>{{ item.ETHLocked1d }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Charts from '@/components/Chart'
export default {
  components: {
    Charts
  },
	data(){
	    return {
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
	    	middleLeftTopList: [
        	{
        	  "text":"Daistats",
        	  "url":"#",
        	},
        	{
        	  "text":"Maker Governance",
        	  "url":"#",
        	},
        	{
        	  "text":"Multi-Collateral Dai Update",
        	  "url":"#",
        	},
        	{
        	  "text":"Redeem old SAI or CDP",
        	  "url":"#",
        	},
        	{
        	  "text":"What is CHAI?",
        	  "url":"#",
        	},
        	{
        	  "text":"EthHub - Maker",
        	  "url":"#",
        	},
	      ],
	    	middleLeftDownList: [
        	{
        	  "text":"Trail of Bits - March 23, 2018",
        	  "url":"#",
        	}
	      	],
      	KeyStatsList:[
    	  	{
    	  	  "name":"in USD",
    	  	  "price":"$9.52B",
    	  	  "change":"+3.8%",
    	  	  "color":"coinIncrease"
    	  	},
    	  	{
    	  	  "name":"in ETH",
    	  	  "price":"3.9M ETH",
    	  	  "change":"-2.5%",
    	  	  "color":"coinDecrease"
    	  	},
    	  	{
    	  	  "name":"in BTC",
    	  	  "price":"175.3K BTC",
    	  	  "change":"+5.6%",
    	  	  "color":"coinIncrease"
    	  	},
    	  	{
    	  	  "name":"ETH Locked",
    	  	  "price":"3.1M ETH",
    	  	  "change":"+1.5K ETH",
    	  	  "color":"coinIncrease"
    	  	}
      	],
      	MakerHistoricalStats:[
    	  	{
    	  	  "Date":"2021-04-22",
    	  	  "TVL":"$9.647B",
    	  	  "TVLcolor":"coinIncrease",
    	  	  "TVLChange":"557.45M",
    	  	  "TotalETHLocked":"3.1M ETH",
    	  	  "ETHLocked1d":"2.01K ETH",
    	  	  "ETHLocked1dColor":"coinIncrease"
    	  	},
    	  	{
    	  	  "Date":"2021-04-20",
    	  	  "TVL":"$9.647B",
    	  	  "TVLcolor":"coinIncrease",
    	  	  "TVLChange":"302.09M",
    	  	  "TotalETHLocked":"3.1M ETH",
    	  	  "ETHLocked1d":"-3.18K ETH",
    	  	  "ETHLocked1dColor":"coinDecrease"
    	  	}
      	],
        chartdataloaded:{
          labels: ['今天', '昨天', '一週前'], // 位於 x 軸的各筆數據 key
          datasets: [
            {
              label: '排名', // x 軸的標籤項目
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              data: ['1', '2', '100'] // 位於 y 軸對應的各筆數據 value
            }
          ]
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
                  stepSize: 1
                }
              }
            ]
          }
        }
	    }
	},
	mounted(){
		
	},
	methods:{
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
  }
}

</script>

<style lang="sass">
@import "@/assets/sass/page/detail/index.sass";
</style>
