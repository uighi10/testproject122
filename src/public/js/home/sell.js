const sellBtn = document.getElementById("sellBtn"),
    textB = document.getElementById("balance"),
    sInfo = Array.from(document.getElementsByClassName("sInfo")),
    sValue = Array.from(document.getElementsByClassName("sValue")),
    EA =Array.from(document.getElementsByClassName("EA"));

var countS = [];
var countC = [];

async function post(where, what){
    a = await fetch(where, {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(what)
    }).then((res)=>res.json())
    .catch((err)=>console.log("문제 생김"));

    return a;
}

function fabricate(str) {
    var a ='';
    str.split('').reverse().forEach((T,i)=>{
        if(i %3 === 0&& i !==0) a = ',' +a;
        a = T + a;
    })
    return a;
}


function showInfo(res){
    
    sInfo.forEach((element,idx)=> {
        element.innerText = countC[idx];
        
    });
    textB.innerText = '잔액: '+ res+ '원';
}

async function updateInfo(){
    const info = await post('/',{id:id});
    sValue.forEach((get, idx)=>{
       get.innerText = fabricate(info.stocks[idx].value.toString())+'원';
    });
    
    //textC.innerText = '잔액: '+info.balance+'원';

}
async function update(){
    const req={
        id:localStorage.getItem("id")
    }
    var res = await post("/sellget",req);
    const info = await post('/',req);
    sValue.forEach((get, idx)=>{
       get.innerText = fabricate(info.stocks[idx].value.toString())+'원';
    });
    if(res.success == true){
        var {money, a,b,c,d,e,f,g,h,i,j,k} = res.info;
        countC=[a,b,c,d,e,f,g,h,i,j,k];
        showInfo(money);
    }
        
    return 0;
}

async function sell(){
    console.log("hell");
    var isover = false
    EA.forEach((element,idx)=>{
        countS[idx]= element.value <= 0 ? 0 : parseInt(element.value,10);
        element.value = 0;
        if(countS[idx] > countC[idx]){
            alert("수량을 확인해 주십시오");
            isover = true;
            return;
        }
    })

    if(isover == true)return 0;

    const req={
        id:localStorage.getItem("id"),
        countS:countS
    }
    
    var res = await post("/sell",req);
    console.log(res); 
    if(res.success ==true){
        countC = res.countc;
        showInfo(res.balance);
    }
}

update();

sellBtn.addEventListener("click",sell);

