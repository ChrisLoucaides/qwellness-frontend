<template>
  <button class="advisee-list-button">
    <div class="icon-wrapper">
      <img class="users-icon" src="../assets/users-icon.png" alt="Users Icon" width="70%">
    </div>
    <span class="button-text"><strong>View Advisee List</strong></span>
  </button>
</template>

<script>
export default {
  name: 'AdviseeListButton',
}
</script>

<style scoped>
.advisee-list-button {
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
  cursor: pointer;
  background-image: linear-gradient(to bottom, transparent 75%, #5691a8 75%);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.users-icon {
  margin-bottom: 6em;
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
</style>
