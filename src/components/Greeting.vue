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
      str1: "Good Afternoon!",
      str2: "[Student Name]",
    }
  },
}
</script>

<style>
span {
  color: #2e89c9;
}

.greeting-container {
  text-align: center;
}

</style>