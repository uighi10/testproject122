const user = document.getElementById('user'),
        EA = Array.from(document.getElementsByClassName('EA')),
        sInfo = Array.from(document.getElementsByClassName('sInfo')),
        sValue = Array.from(document.getElementsByClassName('sValue')),
        textB = document.getElementById('balance'),
        textC =document.getElementById("currentM"),
        countbtn = document.getElementById('countbtn'),
        buybtn = document.getElementById('buybtn');

const stId = localStorage.getItem("stId");
const id = localStorage.getItem("id");
var iscounted = false;
var balance = 0;

if(localStorage.getItem("id")===null){
    alert("로그인");
    location.href ="/login";
}

user.innerText = '아이디: '+stId;

function fabricate(str) {
    var a ='';
    str.split('').reverse().forEach((T,i)=>{
        if(i %3 === 0&& i !==0) a = ',' +a;
        a = T + a;
    })
    return a;
}

async function updateInfo(){
    const info = await post('/',{id:id});
    console.log(info);
    sInfo.forEach((get, idx)=>{
        get.innerText = info.stocks[idx].state;
    });
    
    sValue.forEach((get, idx)=>{
       get.innerText = fabricate(info.stocks[idx].value.toString())+'원';
       if(info.stocks[idx].fluc === 0)get.style.color = "black";
       if(info.stocks[idx].fluc === -1)get.style.color = "blue";
       if(info.stocks[idx].fluc === 1)get.style.color = "red";
    });
    
    textC.innerText = '잔액: '+info.balance+'원';

}

//front show
function showCount(res){
    if(res.success){
        //console.log(res.total,res.balance);
        balance = res.balance;
        textB.innerText = '예상잔액: '+balance +'원';
    }
    else{
        alert(res.msg);
    }
}

function showBuy(res){
    if(res.success){
        alert("성공");
    }
    else{
        alert(res.err);
    }
}

//post
async function post(where, what){
    var a = await fetch(where,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(what)
    }).then((res)=>res.json())
      .catch((err)=>{
        console.error("문제 생김");
      });
    return a;
}

//count total
async function count(){
    const EAcount = [];
    for (let index = 0; index < EA.length; index++) {
        EAcount[index] = EA[index].value <= 0 ? 0 : parseInt(EA[index].value,10);
    }
    
    const req ={
        id :  id,
        count : EAcount
    };
    const respond = await post('/centralCount', req);
    showCount(respond);
    iscounted = true;
}


//buy stocks
async function buy(){
    if(iscounted === false){
        alert("count first");return 0;
    }
    const req ={
        id : id,
        balance: balance
    }
    const respond = await post('/centralBuy',req);
    showBuy(respond);
    
    iscounted =false;
}



updateInfo();

EA.forEach((event)=>{
    event.addEventListener("change",()=>{
        iscounted =false;
    })
});

buybtn.addEventListener("click",buy);
countbtn.addEventListener("click",count);
