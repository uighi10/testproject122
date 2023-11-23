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

    static getStocksValue(){
       return new Promise((resolve, reject) =>{
        const query = "select value from stocks";
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

    static getInfoByColumn(fields){
        return new Promise((resolve,rejects) =>{
            var arr = [`id`,`money`];
            const query ="SELECT id,money FROM users";
            db.query(query,(err,data)=>{

                if(err)rejects(`${err}`);
                
                resolve(data);
            })
        })
    }

    //save
    static saveBalance(userInfo,arr){
        return new Promise((resolve, reject) =>{
            const query = `UPDATE users SET money =?,a=${arr[0]},b=${arr[1]},c=${arr[2]},d=${arr[3]},e=${arr[4]},f=${arr[5]},g=${arr[6]},h=${arr[7]},i=${arr[8]},j=${arr[9]},k=${arr[10]} where id = ?`;
            db.query(query,[userInfo.balance,userInfo.id],(err)=>{
                if(err) reject(`${err}`);
                resolve({success: true});
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

}
module.exports = UserStorage;