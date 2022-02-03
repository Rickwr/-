import { v4 as uuidv4 } from 'uuid';

// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID=()=>{
    // 获取本地存储中的游客身份（查看本地存储中是否有游客身份）
    let uuid_token=localStorage.getItem("UUIDTOKEN");
    if(!uuid_token){
        // 如果本地存储没有，则随机生成一个
        uuid_token=uuidv4();
        // 将随机生成的游客身份存储在本地存储中
        localStorage.setItem("UUIDTOKEN",uuid_token);
    }
    return uuid_token;
}
