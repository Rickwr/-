// home模块的小仓库
import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/api'

const state = {
    // 三级菜单数据
    categoryList: [],
    // 轮播图数据
    bannerList:[],
    // 楼层数据
    floorList:[]
}
const mutations = {
    GETCATEGORYLIST(state, value) {
        state.categoryList = value;
        state.categoryList.length=16;
    },
    GETBANNERLIST(state,value){
        state.bannerList=value;
    },
    GETFLOORLIST(state,value){
        state.floorList=value;
    }
}
const actions = {
    async getCategoryList({commit}) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit('GETCATEGORYLIST', result.data);
        }
    },
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    async getFloorList({commit}){
        let result= await reqGetFloorList();
        if(result.code==200){
            commit('GETFLOORLIST',result.data);
        }
    }
}
const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}