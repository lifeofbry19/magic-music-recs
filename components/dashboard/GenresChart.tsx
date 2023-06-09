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
          "#9DD5BB",
          "#F0DC82",
          "#3DD7E0",
          "#E52B50",
          "#E0E2E2",
          "#851151",
          "#854511",
          "#47DFD3",
          "#FFCE56",
          "#FF6384",
          "#E0E2E2",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={data} />;
}
