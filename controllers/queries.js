import { Matches , Deliveries } from "../models/Schema";
import { sequelize } from "../models/index";


const findNumberOfMatchs = (req,res) =>{
    let data = []
    Matches.findAll({
        attributes:["season",[sequelize.fn("COUNT",sequelize.col("*")),"total_matches"]],
        group:"season"}
    ).then((matches) => {
       matches.forEach(match => data.push(match.dataValues))
       res.json(data)
    })
    .catch((err) => res.send(err))
}

const winnersList = (req,res) => {

    Matches.findAll({
        attributes:["season","winner",[sequelize.fn("COUNT",sequelize.col("*")),"total_wins"]],
        group:["season", "winner"]}
    ).then((matches) => {
        let data = []; 
        matches.forEach(match => data.push(match.dataValues))
        res.json(data);
    })
    .catch((err) => res.send(err))
}

const yuvrajSingh =  (req,res) => {
    Deliveries.findAll({
        attributes:["match_id",[sequelize.fn("SUM",sequelize.col("batsman_run")),"total_run"]],
        where:{batsman:"Yuvraj Singh"},
        group:["match_id"]
    }).then(matches => { 
        let data = []; 
        matches.forEach(match => data.push(match.dataValues))  
        res.json(data);
    })
    .catch((err) => res.send(err))
}

const extraRunsPerTeam = (req,res) => {
    Deliveries.findAll({
        attributes:["bowling_team",[sequelize.fn("SUM",sequelize.col("extra_runs")),"extraRuns"]],
        group:["bowling_team"],
        include:[{
            model:Matches,
            where:{
                season:2016
            },
            attributes:["season"],
        }],                                                                                                                  
    }).then(matches => {
        let data = []; 
        matches.forEach(match => data.push(match.dataValues))
        res.json(data);
    })
    .catch((err) => res.send(err))
}

const economicalBowlers = (req,res) => {
    Deliveries.findAll({
        attributes:["bowler",
        [sequelize.fn("SUM",sequelize.col("total_runs")),
        "economy"],
        [sequelize.fn("COUNT",sequelize.col("total_runs")),
        "overs"]
        ],
        group:["bowler"],
        order: sequelize.col('economy'),
        include:[{
            model:Matches,
            where:{
                season:2015
            },
            attributes:["season"],
        }],                                                                                        
        limit:10                  
    }).then(matches => {
        let data = matches.map(match => match.dataValues).map(calculateEconomy)
        res.json(data);
        
    })
    .catch((err) => res.send(err))
}

function calculateEconomy(value) {
    const { match, bowler, overs, economy} = value;
    let economyOfbower = ((economy)/(overs/6)).toFixed(2);
    return { match, bowler, economyOfbower }
}

export { findNumberOfMatchs, winnersList,yuvrajSingh, extraRunsPerTeam, economicalBowlers }