"use strict";
//프론트 js
//const { json } = require("express");
localStorage.clear();

const id = document.querySelector('#id'),
        psword = document.querySelector('#psword'),
        signUpbtn = document.querySelector('#signUpbtn'),
        stId = document.querySelector('#stId'),
        confirmpsword = document.querySelector('#confirmpsword');


function respond(res){
    if(res.success){
        location.href ="/centralBefore";
        //alert(res.msg);
    }
    else{
        alert(res.msg);
        console.log("hey");
    }
}

function signUp() {
    if(!id.value || !psword.value)return alert("아이디 또는 비밀번호를 입력하십시오.");
    if(psword.value != confirmpsword.value)return alert("비밀번호가 일치하지 않습니다.");

    const req = {
        id: id.value,
        psword:psword.value,
        stId: parseInt(stId.value)
    }
    fetch('/signUp',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res)=>res.json())
      .then((res)=>respond(res))
      .catch((err)=>{
        console.error("회원가입 중 문제 생김");
      })
}


signUpbtn.addEventListener("click",signUp);
