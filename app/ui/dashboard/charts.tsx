"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
);

export function BarChart({
  labels,
  datasets,
  xTitle,
  yTitle,
}: {
  labels: Array<string>;
  datasets: Array<number>;
  chartTitle: string;
  xTitle: string;
  yTitle: string;
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        data: datasets,
        backgroundColor: ["rgba(255, 152, 0, 0.9)", "rgba(66, 66, 66, 0.9)"],
        borderColor: ["rgb(66 66 66)", "rgb(255 152 0)"],
        barPercentage: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
      },
    ],
  };
  const options = {
    indexAxis: "y",
    responsive: true,
    scales: {
      y: {
        title: {
          display: false,
          text: yTitle,
        },
        display: true,
        beginAtZero: true,
        max: Math.max(...datasets),
      },
      x: {
        title: {
          display: false,
          text: xTitle,
        },
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // @ts-ignore: indexAxis is valid according to Chart.js documentation :https://www.chartjs.org/docs/latest/samples/bar/horizontal.html
  return <Bar data={data} options={options} className="w-full" />;
}
