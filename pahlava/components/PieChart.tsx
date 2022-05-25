import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = (values: number[]) => ({
  labels: ["Анализ", "В процессе", "Закрыты"],
  datasets: [
    {
      label: "sprint stats",
      data: values,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderWidth: 0.3,
    },
  ],
});

export const PieChart = ({ values }: { values: number[] }) => {
  return <Pie data={data(values)} />;
};
