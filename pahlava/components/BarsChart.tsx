import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Общая статистика",
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const data = (estArr: number[], totalArr: number[]) => ({
  labels: [
    "июнь",
    "июль",
    "aвгуст",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
    "январь",
    "февраль",
    "март",
    "апрель",
  ],
  datasets: [
    {
      label: "Оценка",
      data: estArr,
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      stack: "Stack 0",
    },
    {
      label: "Затрачено",
      data: totalArr,
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      stack: "Stack 1",
    },
  ],
});

export const BarsChart = ({
  est,
  total,
}: {
  est: number[];
  total: number[];
}) => {
  return <Bar  options={options} data={data(est, total)} />;
};
