/**
 * 🎨 Priya ki Diwali Rangoli
 *
 * Priya Diwali pe rangoli banati hai. Uska pattern ek diamond shape mein
 * hota hai stars (*) ka. Tu usse help kar pattern generate karne mein!
 *
 * Rules (use nested for loops):
 *   - Input n determines the size of the diamond
 *   - The diamond has 2n - 1 rows total
 *   - Row i (1-indexed) of the top half has i stars
 *   - Row i of the bottom half mirrors the top
 *   - Stars are separated by a single space
 *   - Each row has leading spaces for center alignment
 *   - The widest row has n stars: "* * * ... *" (2n-1 chars wide)
 *   - No trailing spaces on any row
 *
 * Pattern for n=3:
 *     *
 *    * *
 *   * * *
 *    * *
 *     *
 *
 * (Each row is a string in the returned array)
 *
 * Validation:
 *   - Agar n positive integer nahi hai (0, negative, decimal, non-number),
 *     return empty array []
 *
 * @param {number} n - Size of the diamond (number of stars in the widest row)
 * @returns {string[]} Array of strings forming the diamond pattern
 *
 * @example
 *   rangoli(1) // => ["*"]
 *   rangoli(2) // => [" *", "* *", " *"]
 *   rangoli(3) // => ["  *", " * *", "* * *", " * *", "  *"]
 */
export function rangoli(n) {
  // Your code here
  if (!Number.isInteger(n) || n <= 0) {
    return [];
  }

  let res = [];
  //upper body diamond
  for (let i = 0; i < n; i++) {
    let spaces = n - 1 - i;
    let currPattern = "";
    for (let j = 0; j < spaces; j++) {
      //spaces loop
      //bcz in last spaces is remaining like this "* * * " i dont need last spaces so i did this.
      currPattern += " ";
    }
    // currPattern += "*";
    //* pattern loop
    for (let k = 0; k <= i; k++) {
      if (k === i) {
        currPattern += "*";
      } else {
        currPattern += "* ";
      }
    }
    res.push(currPattern);
  }

  for (let i = n - 2; i >= 0; i--) {
    // n-2 here bcz we dont need repeated pattern of n like if n=3 (***) its already done on upper half we need form n = 2 then n=1 like that
    //reverse loop for lower half
    let spaces = n - 1 - i;
    let currPattern = "";
    for (let j = 0; j < spaces; j++) {
      currPattern += " ";
    }
    for (let k = 0; k <= i; k++) {
      if (k === i) {
        currPattern += "*";
      } else {
        currPattern += "* ";
      }
    }
    res.push(currPattern);
  }

  return res;
}
