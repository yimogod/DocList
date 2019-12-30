import { UboxChartLineData } from '../detail/ubox-chart-line-data';

export class UboxFpsChartData extends UboxChartLineData{
  constructor() {
    super("ubox_chart_fps");
    this.title = "FPS";
    this.dimensions = ['frame', 'fps'];
    this.series = [{type:'line', symbol:'none'}];
  }
}