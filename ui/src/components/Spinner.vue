<template lang="">
<div class="item">
    <div class="spinner"></div>
</div>
</template>
<script>
export default {
  name: "Spinner",
};
</script>
<style scoped>

.spinner {
  margin: auto;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #20397e;
  animation: spinner 0.85s infinite linear;
}

@keyframes spinner {
  0% {
    transform: scale(0.15);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
    
</style>