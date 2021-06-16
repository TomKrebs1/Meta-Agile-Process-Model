import React, {useEffect, useRef} from "react";
import {useReactiveVar} from "@apollo/client";
import {chartToggle} from "../Service/cache";
import Chart from "chart.js/auto";

export default function RoleCharts (roleData) {
  const roleChartRef = useRef();
  const chartSwitch = useReactiveVar(chartToggle);

  useEffect(() => {
    const data = {
      labels: roleData.labels,
      datasets: [{
        label: 'affinity',
        data: roleData.data.affinity,
        fill: true,
        backgroundColor: chartSwitch ? '#1c54b2ff' : '#1c54b233',
        borderColor: '#2979ff',
        pointBackgroundColor: '#2979ff',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2979ff'
      }, {
        label: 'average affinity',
        data: roleData.data.averageAffinity,
        fill: true,
        backgroundColor: chartSwitch ? '#ab003cff' : '#ab003c33',
        borderColor: '#f50057',
        pointBackgroundColor: '#f50057',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#f50057'
      }]
    };

    const config = {
      type: chartSwitch ? 'bar' : 'radar',
      data: data,
      options: {
        responsive: true,
        scales: {
          [chartSwitch ? 'y' : 'r']: {
            max: 1,
            min: 0,
            ticks: {
              callback: value => (value * 100) + '%'
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    };

    const mapChart = new Chart(roleChartRef.current, config);

    return function cleanup() {
      mapChart.destroy();
    }

  });

  return <canvas ref={roleChartRef}/>
}