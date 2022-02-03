import {reqGetUserAddressList,reqGetTrade} from '@/api'
// 订单交易仓库

const state={
    userAddressList:[],
    orderInfo:{}
};
const mutations={
    GETUSERADDRESSLIST(state,value){
        state.userAddressList=value;
    },
    GETTRADE(state,value){
        state.orderInfo=value;
    }
};
const actions={
    // 获取用户地址信息
    async getUserAddressList({commit}){
        let result=await reqGetUserAddressList();
        if(result.code==200){
            commit('GETUSERADDRESSLIST',result.data);
        }
    },
    // 获取用户订单交易数据
    async getTrade({commit}){
        let result=await reqGetTrade();
        if(result.code==200){
            console.log(result.data);
            commit('GETTRADE',result.data);
        }
    }
};
const getters={}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}