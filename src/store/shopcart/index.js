// shopcart模块的小仓库
import {reqGetCartList,reqDeleteCart,reqCheckCart} from '@/api'

const state={
    shopCartList:[]
};
const mutations={
    GETSHOPCARTLIST(state,value){
        state.shopCartList=value;
    }
};
const actions={
    async getShopCartList({commit}){
        let result= await reqGetCartList();
        if(result.code==200){
            commit("GETSHOPCARTLIST",result.data);
        }
    },
    // 删除购物车单个商品
    async deleteCart({commit},skuId){
        let result=await reqDeleteCart(skuId);
        if(result.code==200){
            return 'ok';    
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车单个商品选中状态
    async checkCart({commit},{skuId,isChecked}){
        let result=await reqCheckCart(skuId,isChecked);
        if(result.code==200){
            return 'ok';    
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 删除全部选中商品
    deleteAllCheckedCart({dispatch,getters}){
        let promiseAll=[];
        getters.shopCartList.cartInfoList.forEach(item => {
            if(item.isChecked==1){
                let promise=dispatch('deleteCart',item.skuId);
                // 将每一次返回的promise添加到数组中
                promiseAll.push(promise);
            }
        });
        // 返回结果，若所有promise都为成功，则返回成功，若有一个失败，则返回失败
        return Promise.all(promiseAll);
    },
    // 修改全部商品选中状态
    changeAllCartChecked({dispatch,getters},isChecked){
        let promiseAll=[];
        getters.shopCartList.cartInfoList.forEach(item => {
            if(item.isChecked!=isChecked){
                let promise=dispatch('checkCart',{skuId:item.skuId,isChecked});
                promiseAll.push(promise);
            }
        });
         // 返回结果，若所有promise都为成功，则返回成功，若有一个失败，则返回失败
         return Promise.all(promiseAll);
    }
};
const getters={
    shopCartList(state){
        return state.shopCartList[0]||{};
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
