/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  function updateObj(resObj, team, winner, matchRes) {
    //{"csk" : {"played" : 0}}
    resObj[team].played += 1;
    if (matchRes === "win" && winner === team) {
      resObj[team].won += 1;
      resObj[team].points += 2;
    } else if (matchRes === "win" && winner !== team) {
      resObj[team].lost += 1;
    } else if (matchRes === "tie") {
      resObj[team].tied += 1;
      resObj[team].points += 1;
    } else if (matchRes === "no_result") {
      resObj[team].noResult += 1;
      resObj[team].points += 1;
    }
  }

  function crateObj(resObj, teamNm, winner, matchRes) {
    // i tried many approaches but finally this final one is worked.
    resObj[teamNm] = {
      //if object key is not exist then create one
      // it create if CSK not exist then create it "CSK" key then we create object of all
      team: teamNm,
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      noResult: 0,
      points: 0,
    };
    updateObj(resObj, teamNm, winner, matchRes);
    //here i called updateobj again bcz if team1 or team2 not existed we create new one but with all empty or with zero values in new object but in curr iteration we have to process it too like, "csk" not exist currently we create new key for it but we didnt assign value of won ,lose etc.. we have to do it i have coming calculation erorr for this i finally fixed it.
  }

  const resObj = {};
  for (let i = 0; i < matches.length; i++) {
    let matchRes = matches[i].result;
    let winner = matches[i].winner;
    let team1 = matches[i].team1;
    let team2 = matches[i].team2;
    if (Object.hasOwn(resObj, team1)) {
      updateObj(resObj, team1, winner, matchRes);
    } else {
      crateObj(resObj, team1, winner, matchRes);
    }
    //we have to check for both the teams so i create dfunction which replaced repeating code btw i get idea of it from claude but implemented it myself.
    if (Object.hasOwn(resObj, team2)) {
      updateObj(resObj, team2, winner, matchRes);
    } else {
      crateObj(resObj, team2, winner, matchRes);
    }
  }

  //now the resObj is looking like this {"CSK" : {"played" : 0,"lost":1},"MI":{"played":1,"won":2}}
  //we need values of this we only created key to keep reference of all keys in the resObj if it existed or not now we not need that key anymore so we use this ->
  let resObjValArr = Object.values(resObj);
  // now the arr is like this [{"played" : 0,"lost":1},{"played" : 0,"lost":1}];
  // now we can traverse on it and sort it
  let sortedArr = resObjValArr.sort((a, b) => {
    if (a.points === b.points) {
      return a.team.localeCompare(b.team);
    } else {
      return b.points - a.points;
    }
  });

  return sortedArr;
}
