import { defaultGetter } from "./utils/apiUtils";
import * as result from "./utils/resultUtils";
import { OrderHistory } from "@/models/pizzaModels";

// TODO Max P: Pull this into an environment variable since (presumably) this would be used in other APIs within this app
const baseUrl = "http://localhost:8080";

export async function getOrderHistoryToppings(): Promise<
  result.Type<OrderHistory>> {
  try {
    const url = `${baseUrl}/pizzas.json`;
    const response = await fetch(url, defaultGetter());
    if (response.ok) {
      // TODO Max P: clean up the way we are mapping this json to the OrderHistory class, consider if this json had a million order toppings in it
      const toppingsJson = await response.json();
      const toppingsOrderHistory = new OrderHistory({ toppings: [] });

      // Using a forEach here as it's more performant than using .map - ultimately a for loop would be the fastest here
      toppingsJson.forEach((t: any) =>
        toppingsOrderHistory.toppings.push(t.toppings)
      );

      return toppingsOrderHistory;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    // TODO Max P: Log the error via some logging mechanism
    // Simulated using console.error here - obviously not production worthy
    console.error(error);
    return new Error(`Server Error: ${error}`);
  }
}

export default {
  getOrderHistoryToppings: getOrderHistoryToppings
};
