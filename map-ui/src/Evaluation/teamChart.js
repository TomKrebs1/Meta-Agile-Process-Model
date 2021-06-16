import React, {useEffect, useRef} from "react";
import Chart from "chart.js/auto";

export default function TeamChart(teamData) {
  const teamChartRef = useRef();

  useEffect(() => {
    const data = {
      labels: teamData.data.labels,
      datasets: teamData.data.datasets.map(member => {
        return {
          label: member.userName,
          data: member.affinity,
          fill: true,
          backgroundColor: member.colors.primary,
          borderColor: member.colors.secondary,
          pointBackgroundColor: member.colors.secondary,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: member.colors.secondary,
        };
      }),
    };

    const config = {
      type: 'radar',
      data: data,
      options: {
        responsive: true,
        scales: {
          r: {
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

    const teamChart = new Chart(teamChartRef.current, config);

    return function cleanup() {
      teamChart.destroy();
    }

  });

  return <canvas ref={teamChartRef}/>
}