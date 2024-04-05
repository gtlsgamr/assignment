This is my submission for the CricHeroes Practical Test- Full Stack Developer Semi Final Match.

# How to run the code

1. Clone the repository
2. Run the following command to install the dependencies

```bash
npm install
```

3. Run the following command to run the code

```bash
npm start
```

4. Open the browser and go to the following URL

```bash
http://localhost:3000
```

Below is the problem statement for the test.

---

# CricHeroes Practical Test- Full Stack Developer

## Semi Final Match

Congratulations on completing the league round of the tournament! Here you go with your Semi Final match. You have just one match before reaching the final. Some match-winning tips:

- Use Node JS / Python
- Prevent invalid input.
- Follow proper naming conventions.
- Commented Code will be better.
- Do not use databases.

### What we are looking for

- How is it like to collaborate and work with you? (It is okay to ask questions anytime to clear yourself.)
- How passionate are you to get an accurate result? (Do not worry about rework but aim for accuracy.)
- Do not hurry to complete the assignment. (You can take the time you want.)

### Problem Definition

Here is an example points table of the IPL 2022 tournament.

| #   | Team                        | Matches | Won | Lost | NRR   | For        | Against    | Pts |
| --- | --------------------------- | ------- | --- | ---- | ----- | ---------- | ---------- | --- |
| 1   | Chennai Super Kings         | 7       | 5   | 2    | 0.771 | 1130/133.1 | 1071/138.5 | 10  |
| 2   | Royal Challengers Bangalore | 7       | 4   | 3    | 0.597 | 1217/140   | 1066/131.4 | 8   |
| 3   | Delhi Capitals              | 7       | 4   | 3    | 0.319 | 1085/126   | 1136/137   | 8   |
| 4   | Rajasthan Royals            | 7       | 3   | 4    | 0.331 | 1066/128.2 | 1094/137.1 | 6   |
| 5   | Mumbai Indians              | 8       | 2   | 6    | -1.75 | 1003/155.2 | 1134/138.1 | 4   |

You need to prepare a tool which will help any team reach a desired position in the points table.

### User Inputs

1. Your Team
2. Opposition Team
3. How many overs match?
4. Desired Position for Your Team in Points Table
5. Toss Result: Batting First / Bowling First
6. Runs Scored (Batting First) - Runs to Chase (Bowling First)

### Calculate NRR For Following Cases:

1. Rajasthan Royals want to reach 3rd Position and their next match is against Delhi Capitals.
   a. If Rajasthan Royals bat first and score 120 runs in 20 overs then Rajasthan Royals should restrict Delhi Capitals for how many runs?
   b. If Delhi Capitals bat first and score 119 runs in 20 overs then Rajasthan Royals should chase 119 runs in how many overs?

2. Rajasthan Royals want to reach 3rd Position and their next match is against Royal Challengers Bangalore.
   c. If Rajasthan Royals bat first and score 80 runs in 20 overs then Rajasthan Royals should restrict Royal Challengers Bangalore for how many runs? (hint: it should be a range)
   d. If Royal Challengers Bangalore bat first and score 79 runs in 20 overs then Rajasthan Royals should chase 79 runs in how many overs? (hint: it should be a range)

### Output Format

- Q-1a: Answer
  - If Rajasthan Royals score X_runs runs in X_overs overs, Rajasthan Royals need to restrict Delhi Capitals between X_runs to X_runs runs in X_overs.
  - Revised NRR of Rajasthan Royals will be between X_nrr to X_nrr.
- Q-1b: Answer
  - Rajasthan Royals need to chase X_runs between X_overs and X_overs Overs.
  - Revised NRR for Rajasthan Royals will be between X_nrr to X_nrr.
- Q-2c: Answer,
  - If X_team_name scores X_runs runs in X_overs overs, X_team_name needs to restrict X_team_name between X_runs to X_runs runs in X_overs.
  - Revised NRR of X_team_name will be between X_nrr to X_nrr.
- Q-2d: Answer,
  - X_team_name needs to chase X_runs between X_overs and X_overs Overs.
  - Revised NRR for X_team_name will be between X_nrr to X_nrr.

All the best!!!
