<template>
  <div class="greeting-container">
    <h1>{{ str1 }}<br/><span>{{ str2 }}</span></h1>
  </div>
</template>
<script>
export default {
  name: 'Greeting',
  data() {
    return {
      str1: "Good Afternoon",
      str2: "Student-Name!",
    }
  },
}
</script>

<style scoped>
span {
  color: #2e89c9;
}

.greeting-container {
  text-align: center;
  margin: 11em;
  font-size: 1.6em;
}

</style>