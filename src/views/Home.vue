<template>
  <div class="home">    
    <img
      alt="Pizza Toppings Logo"
      class="pizza-logo"
      src="../assets/pizza-logo.svg"
    />

    <ToppingsList />
  </div>
</template>

<script>
import ToppingsList from "@/components/ToppingsList.vue";

export default {
  name: "Home",
  components: {
    ToppingsList
  }
};
</script>

<style scoped lang="scss">
.pizza {
  &-logo {
    height: 100px;
    width: 100px;
  }
}
</style>
