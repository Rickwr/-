// Search模块的小仓库
import {reqProductList} from '@/api'

const state = {
    // 搜索模块数据
    productList: {},
}
const mutations = {
    GETPRODUCTLIST(state,value){
        state.productList=value;
    }
}
const actions = {
    async getProductList({commit},searchParams={}){
        let result= await reqProductList(searchParams);
        if(result.code==200){
            commit('GETPRODUCTLIST',result.data);
        }
    }
}
const getters = {
    goodsList(state){
        return state.productList.goodsList||[];
    },
    attrsList(state){
        return state.productList.attrsList||[];
    },
    trademarkList(state){
        return state.productList.trademarkList||[];
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}