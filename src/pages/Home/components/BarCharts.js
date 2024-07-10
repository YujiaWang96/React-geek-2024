import * as echarts from "echarts";
import { useEffect, useRef } from "react";

//柱状图组件
//1.功能代码方这个组件 2.可变部分抽象成props

const BarCharts = (props) => {
  const chartRef = useRef(null);
  useEffect(() => {
    //一定保证dom节点渲染完成了，标签可用后再进行图表渲染

    //获取渲染图表的dom节点
    //const chartDom = document.getElementById("main"); //也可以用useRef
    const chartDom = chartRef.current;

    //图表初始化生成的一个实例对象
    const myChart = echarts.init(chartDom);
    //图表参数
    const option = {
      title: {
        text: props.title,
      },
      xAxis: {
        type: "category",
        data: props.data,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150],
          type: "bar",
        },
      ],
    };
    //如果图表存在，则使用图表参数完成渲染
    option && myChart.setOption(option);
  }, [props.data, props.title]);

  return (
    <div>
      {/* //这个dom元素必须有宽高，图表才能显示 */}
      <div id="main" ref={chartRef} style={{ width: "500px", height: "400px" }}>
        123
      </div>
    </div>
  );
};

export default BarCharts;
