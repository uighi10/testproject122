const user = document.getElementById('user'),
        EA = Array.from(document.getElementsByClassName('EA')),
        sInfo = Array.from(document.getElementsByClassName('sInfo')),
        sValue = Array.from(document.getElementsByClassName('sValue')),
        textB = document.getElementById('balance'),
        textC =document.getElementById("currentM"),
        changetext = document.getElementById('changetext'),
        countbtn = document.getElementById('countbtn'),
        checkbox = document.querySelector('#changeBtn');
        buybtn = document.getElementById('buybtn');


const id = localStorage.getItem("id");

var isover = false;
var isclicked = false;
var balance = 0;
var EAcount = [];


if(localStorage.getItem("id")===null){
    alert("로그인");
    location.href ="/login";
}
 
user.innerText = '안녕하세요.  '+id;

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
    const color = ['blue', 'black','red'];
    const sign = ['&#8595', '-','&#8593'];
    sInfo.forEach((get, idx)=>{
        if(info.stocks[idx].state.includes('//')){
            var arr = info.stocks[idx].state.split('//');
            if(isclicked == true){
                changetext.innerHTML = "기업정보(결과)"
                get.innerHTML = arr[1]+`<br><span style = "color:${color[info.stocks[idx].fluc+1]};font-size:14px">`+arr[0]+'</span>';
            }

            else{
                changetext.innerHTML ="기업정보"
                get.innerHTML = arr[2];
            }

            return;
        }
        get.innerText = info.stocks[idx].state;
    });
    
    
    sValue.forEach((get, idx)=>{
       get.innerText = fabricate(info.stocks[idx].value.toString())+'원';
       if(isclicked == true){
            get.style.color = color[info.stocks[idx].fluc+1];
            get.innerHTML += sign[info.stocks[idx].fluc+1];
       }
       else{
        get.style.color = color[1];
       }
       textC.innerText = '잔액: '+info.balance+'원 ';
    });
    
    //textC.innerText = '잔액: '+info.balance+'원';

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
        isover = true;
    }
}

function showBuy(res){
    if(res.success){
        EA.forEach(element=>element.value = 0);
    }
    else{
        alert("수량을 확인해 주십시오");
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

    for (let index = 0; index < EA.length; index++) {
        EAcount[index] = EA[index].value <= 0 ? 0 : parseInt(EA[index].value,10);
    }
    
    const req ={
        id :  id,
        count : EAcount
    };
    const respond = await post('/centralCount', req);
    showCount(respond);
    
}


//buy stocks
async function buy(){
    if(isover === true){
        alert("잔액이 부족합니다.");return 0;
    }

    const req ={
        id : id,
        balance: balance,
        count: EAcount
    }
    
    const respond = await post('/centralBuy',req);
    showBuy(respond);
    updateInfo();
}

updateInfo();

EA.forEach(element => {
    element.addEventListener("change",count);
});

buybtn.addEventListener("click",buy);
checkbox.addEventListener("change",function(){isclicked = !isclicked; updateInfo();});
