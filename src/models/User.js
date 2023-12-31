//Userstorage에서 가져온거 쓰는 코드
const UserStorage = require('./Userstorage');
var body;

class User {
    constructor(body){
        this.body =body;
        
    }
    async login(){
        const user = this.body;
        try{
            const {id, psword} = await UserStorage.getUserInfo(user.id);
            if(id){
                if(id === user.id && psword === user.psword){
                    return {success:true}
                }
                return {
                    success:false,
                    msg:"올바른 값을 넣었는지 확인해 주십시오."
                }
            }

            return{
                success:false,
                msg:"아이디가 존재하지 않습니다."
            }
        }catch(err){
            return{
                success:false,
                msg:"아이디가 존재하지 않습니다."
            };
        }
    }

    async save(){
        const user = this.body;
        try{
            const response = await UserStorage.saveUserInfo(user);
            return response;
        }catch(err){
            return {success :false,msg :"이미 존재하는 id 입니다."};
        }

    }

    async count(){
        
        const user = this.body;
        try{
            const value = await UserStorage.getStocksValue();
            const userInfo = await UserStorage.getUserInfo(user.id);
            const total = value.reduce((total, value,idx)=>{
                return total = total + value*user.count[idx];
            },0);

            if(userInfo.money-total<0){
                return{
                    success:false,
                    msg:"잔액이 부족합니다."
                }
            }
            return{
                success:true,
                total: total,
                balance: userInfo.money-total
            }
        }catch(err){
            return{
                success:false,
                msg:"에러가 발생했습니다."
            }
        }
        
    }

    async buy(){
        const user = this.body;
        var result = [];
        try{
            var {a,b,c,d,e,f,g,h,i,j,k} = await UserStorage.getUserInfo(user.id);
            var arr =[a,b,c,d,e,f,g,h,i,j,k];
            arr.forEach((value, index)=>{
                var val = value+user.count[index]||user.count[index];
                result[index] = val;
            })
            
            const response = await UserStorage.saveBalance(user,result);
            return response;
        }catch(err){
            return {success :false,msg :err};
        } 
    }
    
    async update(){
        const user = this.body;
        try{
            const stocksdata = await UserStorage.getStockInfo();
            const userInfo = await UserStorage.getUserInfo(user.id);
            return{
                success:true,
                stocks:stocksdata,
                balance:userInfo.money
            }
        }catch(err){
            return {
                success:false
            };
        }
    }

    async getColumn(){
        const user = this.body;
        try{
            const info = await UserStorage.getInfoByColumn(user.column);
            return {
                success:true,
                info:info
            };

        }catch(err){
            return {
                success:false,
                msg:err
            }; 
        }
        
    }

    async getBuycount(){
        const user = this.body;
        try{
            const info = await UserStorage.getUserInfo(user.id);
            return{
                success:true,
                info:info
            }
        }catch(err){
            return{
                success:false,
                msg:err
            }
        }
    }
    
    async sell(){
        const user = this.body;
        try{
            const value = await UserStorage.getStocksValue();
            var {money,a,b,c,d,e,f,g,h,i,j,k} = await UserStorage.getUserInfo(user.id);
            const total = value.reduce((total, val,idx)=>{
                return total += user.countS[idx]*val
            },0);
            
            var arr =[a,b,c,d,e,f,g,h,i,j,k];
            var countc =[];
            arr.forEach((value, index)=>{
                var val = value-user.countS[index];
                countc[index] = val;
            });
            const save ={
                id:user.id,
                balance:money + total
            }
            const response = await UserStorage.saveBalance(save,countc);
            if(response.success==true)
                return{
                    success:true,
                    balance:save.balance,
                    countc:countc
                };
        }catch(err){
            return{
                success:false,
                msg:err
            }
        }
    }
}

module.exports = User;
