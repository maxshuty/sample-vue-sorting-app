<template>
  <div class="toppings">
    <h1>20 Most Popular Order Combinations</h1>

    <div class="container">
      <div v-for="(orderedToppings, index) in sortedTopOrders" :key="index">
        <div class="card">
          <div>
            <p class="card-toppings">
              {{ getOrderCombinationString(orderedToppings[0]) }}
            </p>
            <p class="card-times-ordered">
              {{ `Times Ordered: ${orderedToppings[1]}` }}
            </p>
          </div>
          <p class="card-popularity-number">{{ `Rank #${index + 1}` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { actionTypes as actions, getterTypes as getters } from "@/store/index";

export default Vue.extend({
  name: "ToppingsList",
  data() {
    return {
      sortedTopOrders: []
    };
  },
  created() {
    this.fetchPizzaToppings();
  },
  computed: {
    ...mapGetters({
      filteredOrderHistoryByToppings: getters.FILTERED_ORDER_TOPPINGS
    }),
    ...mapState({
      orderHistory: (state: any) => state.orderHistory
    })
  },
  methods: {
    ...mapActions({
      fetchToppings: actions.FETCH_TOPPINGS
    }),
    getFilteredOrderToppings(numberToDisplay: number): void {
      debugger;
      this.sortedTopOrders = this.filteredOrderHistoryByToppings.slice(
        0,
        numberToDisplay
      );
    },
    async fetchPizzaToppings() {
      await this.fetchToppings();
      this.getFilteredOrderToppings(20);
    },
    getOrderCombinationString(orderedToppings: string): string {
      // TODO Max P: This whole method would be unnecessary if we had an IToppings class and mapped the toppings to it...
      // TODO Max P: The API has a spelling mistake with "alfredo", temporarily fixing it here until the data itself is fixed. Remove this once fixed
      return orderedToppings.replace(",", ", ").replace("alredo", "alfredo");
    }
  }
});
</script>

<style scoped lang="scss">
.container {
  /* Making the grid container responsive using auto-fill */
  margin: 0 200px 0 200px;
  display: grid;
  display: -ms-grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

/* TODO Max P: The card should not be scoped and should live in some global UI Library to be consumed by any service */
.card {
  background: #fff;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 5px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 200px;
  width: 175px;
  justify-content: space-between;

  & p {
    margin: 0;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  &-toppings {
    font-size: 18px;
    font-weight: bold;
    text-transform: capitalize;
  }

  &-times-ordered {
    margin-top: 15px !important;
  }

  &-popularity-number {
    font-size: 24px;
    font-weight: 200;
  }
}
</style>
