"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// const ProfileViewsGraph = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Profile Views",
//         data: [],
//         fill: true,
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.4,
//       },
//     ],
//   });

//   useEffect(() => {
//     // Function to fetch profile views data
//     const fetchProfileViewsData = async () => {
//       try {
//         const data = await getProfileViews();

//         setChartData({
//           labels: data.labels,
//           datasets: [
//             {
//               ...chartData.datasets[0],
//               data: data.views,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching profile views data:", error);
//       }
//     };

//     fetchProfileViewsData();
//   }, []); // Empty dependency array ensures this runs once on mount

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: false,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// };

const ProfileViewsGraph = () => {
  return <div>Profile Views Graph</div>;
};

export default ProfileViewsGraph;
