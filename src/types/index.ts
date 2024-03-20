export type userType ={
    username:string,
    password: string,//密码
    password2:string,//确认密码
    type:string
}

export type userInfo={
    post: string,//求职岗位,
    info: string,//用户资料
    company?:string,//公司信息
    salary?:string,//职位薪资
    header:string
}