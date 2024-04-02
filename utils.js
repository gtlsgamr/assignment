const points = require('./points_table');

const convertOversToActualOvers = (overs) => {
    // One over is equal to 6 balls
    // e.g. If the overs are 1.4, then the actual overs are 1 + (4/6) = 1.667
    return parseFloat((Math.floor(overs) + ((overs % 1) * 10) / 6).toFixed(3));
}

const calculateNrr = (forRuns, forOvers, againstRuns, againstOvers) => {
    // NRR = (Runs scored / Overs faced) - (Runs conceded / Overs bowled)
    const nrr = (forRuns / convertOversToActualOvers(forOvers)) - (againstRuns / convertOversToActualOvers(againstOvers));
    return parseFloat(nrr.toFixed(3));
}

// Helper function to generate a range of numbers
let range = (start, end) => [...Array(end - start + 1).keys()].map(i => i + start);

const calculatePoints = (team1, team2, oversPlayed, position, tossResult, runsScored) => {
    const team1Name = points[team1 - 1].Name;
    const team2Name = points[team2 - 1].Name;

    if (position > points.length) {
        return "You have selected a position that is not possible in the points table";
    }

    if (team1 === team2) {
        return "You cannot play against yourself";
    }

    if (team1 > points.length || team2 > points.length) {
        return "You have selected a team that is not in the points table";
    }

    if (!tossResult in ['Batting First', 'Bowling First']) {
        return "Invalid toss result";
    }

    if (runsScored < 0) {
        return "Negative runs are not possible in cricket.";
    }

    if (points[team1 - 1].Pts + 2 < points[team2 - 1].Pts) {
        return `${team1Name} cannot reach position ${position} by the result of this match`;
    }

    if (points[team1 - 1].Pts + 2 > points[team2 - 1].Pts) {
        return `${team1Name} can reach position ${position} by winning this match by any margin`;
    }

    if (points[team1 - 1].Pts + 2 === points[team2 - 1].Pts) {
        const team1Runs = parseFloat(points[team1 - 1].For.split('/')[0]);
        const team2Runs = parseFloat(points[team2 - 1].For.split('/')[0]);
        const team1Overs = parseFloat(points[team1 - 1].For.split('/')[1]);
        const team2Overs = parseFloat(points[team2 - 1].For.split('/')[1]);
        const team1AgainstRuns = parseFloat(points[team1 - 1].Against.split('/')[0]);
        const team2AgainstRuns = parseFloat(points[team2 - 1].Against.split('/')[0]);
        const team1AgainstOvers = parseFloat(points[team1 - 1].Against.split('/')[1]);
        const team2AgainstOvers = parseFloat(points[team2 - 1].Against.split('/')[1]);
        const targetNrr = parseFloat(points[position - 1].NRR);
        const targetName = points[position - 1].Name;
        const aboveTargetNrr = parseFloat(points[position - 2].NRR);

        if (tossResult === "Batting First") {
            const result = []
            const team2Position = points[team2 - 1].id
            // Loop through all the possible runs that can be scored
            // by the batting team in the given overs played
            // and calculate the NRR for both teams
            // NOTE: This can be possibly optimized by two pointer search, but I have not implemented it here.
            range(1, runsScored - 1).forEach(runs => {
                const team1Nrr = parseFloat((calculateNrr(
                    team1Runs + runsScored,
                    team1Overs + oversPlayed,
                    team1AgainstRuns + runs,
                    team1AgainstOvers + oversPlayed
                )).toFixed(3));
                const team2Nrr = parseFloat((calculateNrr(
                    team2Runs + runs,
                    team2Overs + oversPlayed,
                    team2AgainstRuns + runsScored,
                    team2AgainstOvers + oversPlayed
                )).toFixed(3));

                if (
                    team1Nrr > targetNrr && team1Nrr < aboveTargetNrr // Check if the NRR is between the target and the one above the target
                ) {
                    result.push([runs, team1Nrr, team2Nrr])
                }
            })
            if (result.length === 0) {
                return `${team1Name} cannot reach position ${position} by the result of this match`;
            } else {
                return `If ${team1Name} scores ${runsScored} runs in ${oversPlayed} overs, ${team1Name} needs to restrict ${team2Name} between ${result[0][0]} and ${result[result.length -1][0]} runs in ${oversPlayed} overs. \nThe revised NRR of ${team1Name} will be between ${result[result.length -1][1]} and ${result[0][1]}.`
            }

        } else if (tossResult === "Bowling First") {
            const result = []
            const team2Position = points[team2 -1].id
            range(1,oversPlayed).forEach(overs => {
                const team1Nrr = parseFloat((calculateNrr(
                    team1Runs + runsScored + 1,
                    team1Overs + overs,
                    team1AgainstRuns + runsScored,
                    team1AgainstOvers + oversPlayed
                )).toFixed(3));
                const team2Nrr = parseFloat((calculateNrr(
                    team2Runs + runsScored,
                    team2Overs + oversPlayed,
                    team2AgainstRuns + runsScored + 1,
                    team2AgainstOvers + overs
                )).toFixed(3));

                if (
                    team1Nrr > targetNrr && team1Nrr < aboveTargetNrr // Check if the NRR is between the target and the one above the target
                ) {
                    result.push([runs, team1Nrr, team2Nrr])
                }
            })
            if (result.length === 0) {
                return `${team1Name} cannot reach position ${position} by the result of this match`;
            } else {
                return `${team1Name} need to chase ${runsScored} runs between ${result[0][0]} and ${result[result.length -1][0]} overs.\nThe revised NRR of ${team1Name} will be between ${result[result.length -1][1]} and ${result[result.length -1][1]}.`
            }
        }
    }
}

module.exports = {
    calculatePoints
}
