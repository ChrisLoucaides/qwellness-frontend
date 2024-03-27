<template>
  <div>
    <div v-if="loading" class="loading"></div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="student in students" :key="student.username" class="student-pill" v-motion-roll-visible-once-top>
        <div class="student-info">
          <p class="student-info-item">{{ student.first_name }}</p>
          <p class="student-info-item">{{ student.last_name }}</p>
          <br>
          <p class="student-info-item"><strong>Last Login Date:</strong> {{ formatLastLogin(student.last_login_time) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../auth.ts";

export default {
  data() {
    return {
      students: [],
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        this.loading = true;
        // Get advisor's username from userStore
        const advisorUsername = useUserStore().user.username;

        const response = await fetch(`http://localhost:8000/filter-advisors-students/?username=${advisorUsername}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        this.students = data.students;
      } catch (error) {
        console.error('Failed to fetch students:', error);
        this.error = error.message || 'Failed to fetch students';
      } finally {
        this.loading = false;
      }
    },
    formatLastLogin(lastLogin) {
      const date = new Date(lastLogin);
      const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
      return formattedDate;
    }
  }
};
</script>

<style scoped>
.student-pill {
  background-color: #4f9ce5;
  border-radius: 50px;
  padding: 1em 3em;
  margin: 1em;
}

.student-info {
  color: #ffffff;
  font-size: 2em;
}

.student-info-item {
  margin: 5px 2px;
  display: inline;
}
</style>
