import Vue from "vue";
import Vuex from "vuex";
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { isSuccess } from "@/api/utils/resultUtils";
import toppingsApi from "@/api/toppingsApi";
import { OrderHistory } from "@/models/pizzaModels";

Vue.use(Vuex);

export const getterTypes = Object.freeze({
  FILTERED_ORDER_TOPPINGS: "filteredOrderToppings"
});

export const actionTypes = Object.freeze({
  FETCH_TOPPINGS: "fetchToppings"
});

export class State {
  loading: boolean;
  orderHistory: OrderHistory;

  constructor() {
    this.loading = false;
    this.orderHistory = new OrderHistory();
  }
}

export const getters: GetterTree<State, State> = {
  // Taking all of the orders and counting the most commonly ordered combinations and then sorting that array
  // from the most ordered combinations to the least ordered
  filteredOrderToppings: (state: any) =>
    Object.entries(
      state.orderHistory.toppings.reduce(
        (orderedToppingsAcc: any, order: any) => {
          // Sorting the order to prevent duplicates of the same toppings (ie: ["pepperoni", "beef"] and ["beef", "pepperoni"])
          const sortedOrder = order.sort();
          orderedToppingsAcc[sortedOrder] = orderedToppingsAcc[sortedOrder]
            ? orderedToppingsAcc[sortedOrder] + 1
            : 1;

          return orderedToppingsAcc;
        },
        Object.create(null)
      )
    ).sort((a: any, b: any) => b[1] - a[1])
};

export const actions: ActionTree<State, State> = {
  async fetchToppings({ commit }) {
    try {
      commit("setLoading", true);
      const response = await toppingsApi.getOrderHistoryToppings();
      if (isSuccess(response)) {
        commit("setToppings", response);
      } else {
        // TODO Max P: pop an error toast if we make it in here
      }
    } finally {
      commit("setLoading", false);
    }
  }
};

export const mutations: MutationTree<State> = {
  setLoading(state: State, isLoading = false) {
    state.loading = isLoading;
  },
  setToppings(state: State, orderHistory: OrderHistory) {
    state.orderHistory = orderHistory;
  }
};

export const store = new Vuex.Store({
  state: new State(),
  getters,
  actions,
  mutations
});

export default {
  store,
  getterTypes,
  actionTypes
};
