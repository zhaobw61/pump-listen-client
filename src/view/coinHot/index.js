import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as echarts from 'echarts';
import moment from 'moment';
import { getTwitterLogHotService } from '../../service/index';

export default function CoinHot() {
  const { address } = useParams();
  const chartRef = useRef(null);
  const [xAxisData, setXAxisData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  const getTwitterLogHot = async (address) => {
    let xData = [],
      yData = [];
    const res = await getTwitterLogHotService(address);
    const { success, data } = res;
    console.log(res);
    if (success && data && data.length > 0) {
      data.sort((a, b) => a.time - b.time);
      data.forEach((item) => {
        let totalScore = item.caTwitterScore + item.lastScore + item.topScore;
        xData.push(moment(Number(item.time)).format('YYYY-MM-DD HH:mm:ss'));
        yData.push(totalScore);
      });
    }
    console.log(xData);
    console.log(yData);
    setXAxisData([...xData]);
    setSeriesData([...yData]);
  };
  useEffect(() => {
    getTwitterLogHot(address);
  }, [address]);
  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const options = {
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: seriesData,
          type: 'line',
        },
      ],
    };

    chart.setOption(options);

    // 销毁图表
    return () => {
      chart.dispose();
    };
  }, [xAxisData, seriesData]);
  return (
    <div>
      <div ref={chartRef} style={{ width: '600px', height: '400px' }} />
    </div>
  );
}
