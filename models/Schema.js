import Sequelize from "sequelize";
import { sequelize } from "./index";

const Matches = sequelize.define('matches', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    season:Sequelize.STRING,
    date:Sequelize.DATE,
    team1:Sequelize.STRING,
    team2:Sequelize.STRING,
    toss_winner:Sequelize.STRING,
    result:Sequelize.STRING,
    winner:Sequelize.STRING,
    win_by_runs:Sequelize.INTEGER,
    win_by_wickets:Sequelize.INTEGER
});

const Deliveries = sequelize.define('DELIVERIES', {
    match_id:{
        type:Sequelize.INTEGER(10),
        primaryKey:true
    },
    batting_team:Sequelize.STRING,
    bowling_team:Sequelize.STRING,
    over:Sequelize.INTEGER,
    ball:Sequelize.INTEGER,
    batsman:Sequelize.STRING,
    bowler:Sequelize.STRING,
    batsman_runs:Sequelize.INTEGER,
    extra_runs:Sequelize.INTEGER,
    total_runs:Sequelize.INTEGER
});

Deliveries.removeAttribute("id");
Deliveries.belongsTo(Matches, {foreignKey:'match_id'});
Matches.hasMany(Deliveries, {foreignKey:'id'});

sequelize.sync()

export { Matches, Deliveries }