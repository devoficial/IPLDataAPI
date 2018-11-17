import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import { findNumberOfMatchs,
            winnersList,
            yuvrajSingh,
            extraRunsPerTeam,
            economicalBowlers
    } from "./controllers/queries";

// Get number of matches per year
app.get("/api/numOfMatches",findNumberOfMatchs)

// Get Winners list for Each year
app.get("/api/winnersList", winnersList)

// Get yuvraj singh's batting stats from all ipl years per Match
app.get("/api/yuvrajSingh", yuvrajSingh)

// Get extra runs conceded by each team of 2016
app.get("/api/extraRuns",extraRunsPerTeam)

// Get top ten economical bowler of 2015
app.get("/api/economicalBowlers",economicalBowlers)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});