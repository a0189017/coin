<script>
import Chart from "chart.js"
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  mixins: [reactiveProp],
  extends: Line,
  props: ['chartData','options'],
  mounted() {
    this.renderLineChart()
  },
  methods: {
    renderLineChart() {
      this.renderChart(this.chartData, this.options);
    }
  },
  watch: {
    'chartData': function () {
      this.renderChart(this.chartData, this.options);
    }

  }
}
</script>