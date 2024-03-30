<template>
  <div>
    <div v-motion-slide-visible-once-top>
      <button class="upcoming-meetings-button" @mouseover="moveUp" @mouseout="moveDown">
        <div class="chart">
          <Doughnut :data="chartData" :options="{maintainAspectRatio: true}"
                    style="width: 100%; height: 240px;"></Doughnut>
        </div>
        <span class="button-text"><strong>Student Interaction</strong></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "vue-chartjs";

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
.upcoming-meetings-button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25em;
  height: 25em;
  border: none;
  border-radius: 50px;
  background-color: #a8b5c2;
  padding: 10px;
  margin: 1em;
  cursor: pointer;
  background-image: linear-gradient(to bottom, transparent 75%, #5691a8 75%);
  transition: transform 0.3s ease-in-out;
}

.users-icon {
  margin-bottom: 6em;
  width: 70%;
}

.button-text {
  color: #fdfdfd;
  font-size: 2rem;
  text-align: center;
  position: absolute;
  bottom: 1em;
  left: 0;
  right: 0;
}

.upcoming-meetings-button.hovered {
  transform: translateY(-2em);
}

.chart {
  padding-bottom: 6.5em;
}
</style>
