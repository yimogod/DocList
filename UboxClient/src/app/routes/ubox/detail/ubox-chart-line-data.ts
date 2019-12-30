export class UboxChartLineData{
    public name = "null_name";
    public data:any = {};
    public title = "null_title";
    public dimensions:any = [];
    public series:any = [];

    GRAPH = {
      tooltip: { trigger: 'axis', },
      title: { text: "null_title", },
      legend: {},
      toolbox: { feature: { dataZoom: { yAxisIndex: 'none' }, }, },

      dataset:{},
      xAxis: { type: 'category', boundaryGap: false},
      yAxis: {},
      series: [],
      dataZoom: {handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',},
    };
  
    constructor(name:string) {
      this.name = name;
    }
  
    ShowChart(srcData : any) {
      setTimeout(()=> {
        let e:any = document.getElementById(this.name);
        if (e == null){
          alert(this.name + " div id is null.")
        }else {
          this.GRAPH.title["text"] = this.title;
          
          this.GRAPH.dataset["source"] = srcData;
          this.GRAPH.dataset["dimensions"] = this.dimensions;
          this.GRAPH.series = this.series;

          echarts.init(e).setOption(this.GRAPH);
        }
      }, 2000);
    }
}