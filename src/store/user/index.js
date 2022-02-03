import {reqGetCode,reqLogin,reqRegister,reqGetUserInfo,reqLogout} from '@/api'
// 用户登录注册仓库

const state={
    // 初始化令牌
    token:localStorage.getItem("TOKEN"),
    userInfo:{}
};
const mutations={
    USERLOGIN(state,value){
        state.token=value.token;
    },
    GETUSERINFO(state,value){
        state.userInfo=value;
    },
    // 退出登录
    LOGOUT(state){
        // 首先需要清空state
        state.token="";
        state.userInfo={};
        // 其次清空本地存储
        localStorage.removeItem("TOKEN");
    }

};
const actions={
    // 获取验证码
    async getCode({commit},phone){
        // 真实情况到此结束，等待用户输入
        let result=await reqGetCode(phone);
        // 模拟用户收到验证码
        if(result.code==200){
            alert(result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result=await reqRegister(user);
        // console.log(result);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error(result.message));
        }
    },
    // 用户登录
    async userLogin({commit},user){
        let result=await reqLogin(user);
        if(result.code==200){
            commit('USERLOGIN',result.data);
            localStorage.setItem("TOKEN",result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error(result.message));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result=await reqGetUserInfo();
        if(result.code==200){
            commit('GETUSERINFO',result.data);
        }else{
            return Promise.reject(new Error(result.message));
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result=await reqLogout();
        if(result.code==200){
            commit('LOGOUT');
            return 'ok';
        }else{
            return Promise.reject(new Error(result.message));
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