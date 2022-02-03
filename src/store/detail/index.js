// detail模块的小仓库
import {reqGetDetailList,reqUpdateCartList} from '@/api'
// 封装游客身份模块，生成一个随机字符串（生成后不可变）
import {getUUID} from '@/utils/uuid_token'

const state= {
    DetailList:{},
    // 游客身份
    uuidToken:getUUID()
};
const mutations= {
    GETDETSILLIST(state,value){
        state.DetailList=value;
        console.log(value);
    }
};
const actions= {
    async getDetailList({commit},skuId){
        let result= await reqGetDetailList(skuId);
        if(result.code==200){
            commit('GETDETSILLIST',result.data);
        }
    },
    async reqUpdateCartList({commit},{skuId,skuNum}){
        let result= await reqUpdateCartList(skuId,skuNum);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters= {
    // 导航路径数据
    categoryView(state){
        return state.DetailList.categoryView||{};
    },
    // 商品数据
    skuInfo(state){
        return state.DetailList.skuInfo||{};
    },
    spuSaleAttrList(state){
        return state.DetailList.spuSaleAttrList||[];
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}