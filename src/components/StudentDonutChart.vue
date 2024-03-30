<template>
  <div>
    <div v-motion-slide-visible-once-top>
      <button class="student-interaction-button" @mouseover="moveUp" @mouseout="moveDown">
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
  labels: ["Login > 2 Weeks", "Login < 2 Weeks"],
  datasets: [
    {
      label: "Student Attendance",
      data: [300, 50],
      backgroundColor: [
        "rgb(136,14,38)",
        "rgb(19,192,33)",
      ],
      hoverOffset: 4,
    },
  ],
};

</script>

<style scoped>
.student-interaction-button {
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

.button-text {
  color: #fdfdfd;
  font-size: 2rem;
  text-align: center;
  position: absolute;
  bottom: 1em;
  left: 0;
  right: 0;
}

.student-interaction-button:hover {
  transform: translateY(-2em);
}

.chart {
  padding-bottom: 6.5em;
}
</style>
