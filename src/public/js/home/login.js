"use strict";
//프론트 js
//const { json } = require("express");
localStorage.clear();
console.log("loginjs");

const id = document.querySelector('#id'),
        psword = document.querySelector('#psword'),
        stId = document.querySelector('#stId'),
        loginbtn = document.querySelector('#loginbtn'),
        gotosignUp=document.querySelector('#gotosignUp');


function logincheck(res){
    if(res.success){
        localStorage.setItem("stId",`${stId.value}`);
        localStorage.setItem("id",`${id.value}`);
        location.href ="/central"; 
    }
    else{
        alert(res.msg);
        //console.log("hey");
    }
}

function loginf() {
    if(!id.value || !psword.value || !stId.value)return alert("입력하십시오.");
    const req = {
        id: id.value,
        psword:psword.value,
        stId:parseInt(stId.value)
    }
    fetch('/login',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res)=>res.json())
      .then((res)=>logincheck(res))
      .catch((err)=>{
        console.error("로그인 중 문제 생김");
      })
}


loginbtn.addEventListener("click",loginf);
gotosignUp.addEventListener("click",()=>{
    location.href ="/signUp";
})
