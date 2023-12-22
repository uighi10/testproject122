//상수 정의(바뀌지 않음)
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


//로그인에서 저장한 id가져오기
const id = localStorage.getItem("id");

//변수 정의(바뀜)
var isover = false;
var isclicked = false;
var balance = 0;
var EAcount = [];

//id가 저장되어있지 않을때 --> 로그인 안함 -->로그인
if(localStorage.getItem("id")===null){
    alert("로그인 페이지로 이동합니다.");
    //로그인 페이지로 이동
    location.href ="/login";
}

//인사
user.innerText = '안녕하세요.  '+id;

//가격 꾸미기
function fabricate(str) {
    var a ='';
    //거꾸로 쪼갬
    str.split('').reverse().forEach((T,i)=>{
        //3의 배수 일때 컴마 찍어주기
        if(i %3 === 0&& i !==0) a = ',' +a;
        a = T + a;
    })
    //꾸며진 것을 반환
    return a;
}

//정보 업데이트
async function updateInfo(){
    //데이터 베이스에서 정보를 가져옴.
    const info = await post('/',{id:id});
    console.log(info);
    //컬러, 기호 정하기
    const color = ['blue', 'black','red'];
    const sign = ['&#8595', '-','&#8593'];
    //get-테이블 정보칸(sInfo), idx -index--> 기업정보 업데이트
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
    
    //기업 가격, 변동 업데이트
    sValue.forEach((get, idx)=>{
       get.innerText = fabricate(info.stocks[idx].value.toString())+'원';
       if(isclicked == true){
            get.style.color = color[info.stocks[idx].fluc+1];
            get.innerHTML += sign[info.stocks[idx].fluc+1];
       }
       else{
        get.style.color = color[1];
       }
    });
    
    textC.innerText = '잔액: '+info.balance+'원';

}

//front show
function showCount(res){
    if(res.success){
        //console.log(res.total,res.balance);
        isover = false;
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

//백엔드로 정보를 보내고 받는 함수
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

//예상잔액 구하고 총합세기
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
    if( isover ==true){
        alert("진액이 부족합니다.")
        return;
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
