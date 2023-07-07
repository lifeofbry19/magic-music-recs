"use client";
import { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type TopGenres = {
  name: string;
  percentage: number;
}[];

export default function GenresChart({ topGenres }: { topGenres: TopGenres }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: topGenres.map((genre) => genre.name),
    datasets: [
      {
        label: "Top Genres",
        data: topGenres.map((genre) => genre.percentage),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={data} />;
}
