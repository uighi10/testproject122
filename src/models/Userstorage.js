"use strict"
//crud 만하는 코드
const { json } = require('body-parser');
const { error } = require('console');
const { userInfo } = require('os');

//저장
const db = require("../config/db");
const { resolve } = require('path');
const { rejects } = require('assert');
const { query } = require('express');

class UserStorage{

    //유저 키값에 대응하는 값얻기
    static getStockInfo(){
        return new Promise((resolve, reject) =>{
            const query = "select * from stocks";
            db.query(query,(err, data)=>{
                if(err) reject(`${err}`);
                resolve(data);
            });
        })
    }
    
    static getUserInfo(id){
        return new Promise((resolve, reject) =>{
            const query = "select * from users WHERE id = ?";
            db.query(query,[id],(err, data)=>{
                if(err) reject(`${err}`);
                resolve(data[0]);
            });
        })
    }

    static saveUserInfo(userInfo){
        return new Promise((resolve, reject) =>{
            const query = "insert into users(id, psword,stId,money) values(?,?,?,?);";
            db.query(query,[userInfo.id,userInfo.psword,userInfo.stId,300000],(err)=>{
                if(err) reject(`${err}`);
                resolve({success: true});
            });
        })
    }

    static getStocksValue(){
       return new Promise((resolve, reject) =>{
        const query = "select * from stocks";
        db.query(query,(err, data)=>{
            const info  = [];
            for (let index = 0; index < data.length; index++) {
                info[index] = data[index].value;
            }
            if(err) reject(`${err}`);
            resolve(info);
        })
       })
    }

    static saveBalance(userInfo){
        return new Promise((resolve, reject) =>{
            const query = "UPDATE users SET money =? where id = ?";
            db.query(query,[userInfo.balance,userInfo.id],(err)=>{
                if(err) reject(`${err}`);
                resolve({success: true});
            });
        })
    }

}
module.exports = UserStorage;