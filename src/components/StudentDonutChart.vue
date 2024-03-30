<template>
  <div>
    <Doughnut :data="chartData" :options="{maintainAspectRatio: true}" style="width: 100%; height: 350px;"></Doughnut>
    <h2>My Student Attendance Ratio</h2>
  </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Student Attendance",
      data: [300, 50, 100],
      backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

</script>

<style scoped>

</style>
