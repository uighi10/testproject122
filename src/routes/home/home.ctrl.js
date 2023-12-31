const { use } = require(".");

const User = require('../../models/User');
const UserStorage = require("../../models/Userstorage");
const logger = require("../../config/logger");


//라우팅
const output ={
    
    login : (req,res)=>{
        
        res.render("home/login");
    },
    signUp :(req, res)=>{
        res.render("home/signUp");
    },
    central :(req, res)=>{
        res.render("home/central");
    },
    detail:(req,res)=>{
        res.render("home/ranking");
    },
    sell:(req,res)=>{
        res.render("home/sell");
    },
    before:(req,res)=>{ 
        res.render("home/before");
    }

};

const process ={
    login:async (req,res)=>{
        const user = new User(req.body);
        logger.log('info',`${req.body.id} login`);
        const response = await user.login();
        return res.json(response);
    },

    signUp:async (req,res)=>{
        const user = new User(req.body);
        logger.log('info',`${req.body.id} signUp`);
        const response = await user.save(user);
        return res.json(response);
    },

    count:async(req,res)=>{
        const user = new User(req.body);
        const response = await user.count();
        return res.json(response);
    },

    buy:async(req,res)=>{
        const user = new User(req.body);
        const response = await user.buy();
        return res.json(response);
    },

    //update
    hello : async (req,res)=>{
        const user = new User(req.body);
        const response = await user.update();
        return res.json(response);
    },

    ranking:async(req,res)=>{
        const user = new User(req.body);
        const response = await user.getColumn();
        return res.json(response);
    },

    getInfo:async(req,res)=>{
        const user = new User(req.body);
        const response = await user.getBuycount();
        return res.json(response);
    },

    sell:async(req,res)=>{
        const user = new User(req.body);
        const response = await user.sell();
        return res.json(response);
    }
}

module.exports = {
    output,
    process,
}