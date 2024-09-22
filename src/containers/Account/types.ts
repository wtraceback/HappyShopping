// 登录返回结果类型
export type LoginResponseType = {
    success: boolean;
    data: {
        token: string;
    }
}

// 注册返回结果类型
export type RegisterResponseType = {
    success: boolean,
    data: boolean,
}