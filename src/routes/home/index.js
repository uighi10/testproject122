"use strict"
//라우터
const express = require('express');

const router = express.Router();

const ctrl = require("./home.ctrl");

router.get('/central',ctrl.output.central);
router.get('/login', ctrl.output.login);
router.get('/signUp',ctrl.output.signUp);
router.get('/details',ctrl.output.detail);

router.post('/login',ctrl.process.login);
router.post('/signUp',ctrl.process.signUp);
router.post('/centralCount',ctrl.process.count);
router.post('/centralBuy',ctrl.process.buy);
router.post('/', ctrl.process.hello);


module.exports =router;