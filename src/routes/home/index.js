"use strict"
//라우터
const express = require('express');

const router = express.Router();

//honm.ctrl.js참조
const ctrl = require("./home.ctrl");

//페이지 불러오기
router.get('/central',ctrl.output.central);
router.get('/centralBefore',ctrl.output.before);
router.get('/login', ctrl.output.login);
router.get('/signUp',ctrl.output.signUp);
router.get('/ranking',ctrl.output.detail);
router.get('/sell',ctrl.output.sell);

//프론트 엔드에서 백엔드로 요청하기
router.post('/login',ctrl.process.login);
router.post('/signUp',ctrl.process.signUp);
router.post('/centralCount',ctrl.process.count);
router.post('/centralBuy',ctrl.process.buy);
router.post('/', ctrl.process.hello);
router.post('/ranking',ctrl.process.ranking);
router.post('/sellget', ctrl.process.getInfo);
router.post('/sell',ctrl.process.sell);


module.exports =router;