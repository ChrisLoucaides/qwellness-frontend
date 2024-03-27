<template>
  <div v-motion-slide-visible-once-right>
    <router-link to="/studentlist">
      <button class="advisee-list-button" @mouseover="moveUp" @mouseout="moveDown">
        <img class="users-icon" src="../assets/users-icon.png" alt="Users Icon">
        <span class="button-text"><strong>View Advisee List</strong></span>
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AdviseeListButton',
  methods: {
    moveUp(event) {
      event.currentTarget.classList.add('hovered');
    },
    moveDown(event) {
      event.currentTarget.classList.remove('hovered');
    }
  }
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
  margin: 1em;
  cursor: pointer;
  background-image: linear-gradient(to bottom, transparent 75%, #5691a8 75%);
  transition: transform 0.3s ease-in-out;
}

.users-icon {
  margin-bottom: 6em;
  width: 70%
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

.advisee-list-button.hovered {
  transform: translateY(-2em);
}
</style>
