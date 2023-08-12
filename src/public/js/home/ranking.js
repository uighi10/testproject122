"use strict";
const p = document.getElementById('rank');

async function getinfo(){
    const req ={
        column:["id","money"]
    }
    var a= await fetch('/ranking',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res)=>res.json())
    .catch((err)=>{
        console.error("문제 생김");
      });

    return a;
}

function selectionSort(arr) {
    let indexMax;
    for (let x = 0; x < arr.length - 1; x++) {
      indexMax = x;
      for (let y = x + 1; y < arr.length; y++) {
        if (arr[y].money > arr[indexMax].money) {
          indexMax = y;
        }
      }
      [arr[x], arr[indexMax]] = [arr[indexMax], arr[x]];
    }
    return arr;
  }

function showrank(arr){
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        p.innerHTML += '<strong>'+(index+1)+ '위  </strong>'+ element.id+ "<strong>  재산:  </strong>"+element.money+'원'+'<br>';
    }
}

async function getrank(){
    const respond = await getinfo();
   if(respond.success){
        var info = selectionSort(respond.info);
        showrank(info);
   } 
}

getrank();


