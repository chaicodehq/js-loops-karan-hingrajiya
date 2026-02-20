/**
 * 🍗 Paradise Biryani Batch System
 *
 * Paradise restaurant mein biryani orders aate hain. Kitchen ek batch mein
 * sirf 5 plates bana sakti hai. Agar ek order mein zyada plates hain toh
 * woh multiple batches mein split hota hai.
 *
 * Rules (use do...while loop):
 *   - orders is an array of numbers (plates per order): [3, 7, 2, ...]
 *   - Process orders one by one (for each order, use do...while for batching)
 *   - Each batch can have MAXIMUM 5 plates
 *   - If an order has more than 5, split into batches:
 *     e.g., order of 12 = batch(5) + batch(5) + batch(2) = 3 batches
 *   - Track: totalBatches, totalPlates, ordersProcessed
 *   - Skip orders that are not positive integers (0, negative, decimal, non-number)
 *
 * Validation:
 *   - Agar orders array nahi hai ya empty hai,
 *     return: { totalBatches: 0, totalPlates: 0, ordersProcessed: 0 }
 *
 * @param {number[]} orders - Array of plate counts per order
 * @returns {{ totalBatches: number, totalPlates: number, ordersProcessed: number }}
 *
 * @example
 *   biryaniBatchProcessor([3, 7, 2])
 *   // Order 3: 1 batch (3 plates)
 *   // Order 7: 2 batches (5 + 2 plates)
 *   // Order 2: 1 batch (2 plates)
 *   // => { totalBatches: 4, totalPlates: 12, ordersProcessed: 3 }
 *
 *   biryaniBatchProcessor([5, 10])
 *   // Order 5: 1 batch (5 plates)
 *   // Order 10: 2 batches (5 + 5 plates)
 *   // => { totalBatches: 3, totalPlates: 15, ordersProcessed: 2 }
 */
export function biryaniBatchProcessor(orders) {
  // Your code here
  if (!Array.isArray(orders) || orders.length === 0) {
    return { totalBatches: 0, totalPlates: 0, ordersProcessed: 0 };
  }

  let ordersProcessed = 0;
  let totalBatches = 0;
  let i = 0;
  let totalPlates = 0;
  do {
    let currOrder = orders[i];
    if (isNaN(currOrder) || !Number.isInteger(currOrder) || currOrder <= 0) {
      i++;
      continue;
    }

    // if (currOrder > 5) {
    //   totalBatches += Math.ceil(currOrder / 5);
    // } else {
    //   totalBatches = totalBatches + 1; //if order not greater than 5 than only 1 batch will processed
    // }
    //i implemented it my self but since the question asks me to use do..while i just implemented this optimal solution first as it comes in my mind first now i am doing do..while approach

    let largeOrders = currOrder;
    do {
      // for (let i = 1; i <= 5; i++) {
      //   largeOrders -= 1;
      //   if(largeOrders <= 0){
      //     break;
      //   }
      // }
      largeOrders -= 5;
      //i can just add this line but the idea of including it never came in my mind LOL i just use another for loop which is just purely not needed but i solved the question useing for loop but this cleaner approach AI gave me and i implemented it here.
      totalBatches++;
    } while (largeOrders > 0);

    ordersProcessed++;
    totalPlates += currOrder;
    i++;
  } while (i < orders.length);

  return { totalBatches, totalPlates, ordersProcessed };
}
