<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="student in students" :key="student.username" class="student">
        <p>Username: {{ student.username }}</p>
        <p>First Name: {{ student.first_name }}</p>
        <p>Last Name: {{ student.last_name }}</p>
        <p>Last Login Time: {{ student.last_login_time }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import {useUserStore} from "../../auth.ts";
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
    }
  }
};
</script>

<style scoped>

</style>