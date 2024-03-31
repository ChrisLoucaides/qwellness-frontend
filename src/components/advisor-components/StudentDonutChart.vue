<template>
  <div>
    <div v-motion-slide-visible-once-top>
      <button class="student-interaction-button" @mouseover="moveUp" @mouseout="moveDown">
        <div class="chart">
          <Doughnut :data="chartData" :options="chartOptions" style="width: 100%; height: 240px;"></Doughnut>
        </div>
        <span class="button-text"><strong>Student Interaction</strong></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { useUserStore } from "../../../auth.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

let chartData = ref({
  labels: ["Login > 2 Weeks", "Login < 2 Weeks"],
  datasets: [
    {
      label: "Student Attendance",
      data: [0, 0],
      backgroundColor: ["rgb(136,14,38)", "rgb(19,192,33)"],
      hoverOffset: 4,
    },
  ],
});

async function updateChartData() {
  try {
    const advisorUsername = useUserStore().user.username;
    const response = await fetch(`http://localhost:8000/filter-advisors-students/?username=${advisorUsername}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    const data = await response.json();
    const students = data.students;

    const loggedWithinTwoWeeks = students.filter(student => !isExpired(student.last_login_time)).length;
    const loggedOverTwoWeeks = students.length - loggedWithinTwoWeeks;

    chartData.value = {
      labels: ["Login > 2 Weeks", "Login < 2 Weeks"],
      datasets: [
        {
          label: "Student Attendance",
          data: [loggedOverTwoWeeks, loggedWithinTwoWeeks],
          backgroundColor: ["rgb(136,14,38)", "rgb(19,192,33)"],
          hoverOffset: 4,
        },
      ],
    };
  } catch (error) {
    console.error('Failed to update chart data:', error);
  }
}

updateChartData();

function isExpired(lastLogin) {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  return new Date(lastLogin) < twoWeeksAgo;
}

function moveUp(event) {
  event.currentTarget.classList.add('hovered');
}

function moveDown(event) {
  event.currentTarget.classList.remove('hovered');
}
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
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1),
  -4px 0 8px rgba(0, 0, 0, 0.1),
  4px 0 8px rgba(0, 0, 0, 0.1),
  0 8px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
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
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.2),
  -6px 0 10px rgba(0, 0, 0, 0.2),
  6px 0 10px rgba(0, 0, 0, 0.2),
  0 10px 10px rgba(0, 0, 0, 0.2);
}

.chart {
  padding-bottom: 6.5em;
}
</style>
