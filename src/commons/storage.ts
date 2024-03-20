interface ValueParams{
    value:any;
    setTime:number;
    expiryTime:number;
}

class localStorate{
    constructor(){}
    private localStorage:UniNamespace.Uni=uni;


    /**
     * 设置指定key的缓存
     * @param key
     * @param value
     * @param expiryTime 过期时间，单位小时(h),会自动转成毫秒
     */

    set(key:string ,value:any, expiryTime:number){
        try{
          if(value===undefined||value==null) return;
          let stringfyValue='';
          if(expiryTime){
            //转换为毫秒
            expiryTime=expiryTime *60 *60*1000;
            stringfyValue=JSON.stringify({
                value,
                setTime:Date.now(),
                expiryTime
            })
          }else{
            stringfyValue=JSON.stringify(value);
          }
          this.localStorage.setStorageSync(key,stringfyValue);
        }catch(error){
            console.log(error)
        }

    }

    /**
     * 获取指定key的缓存
     * @param key
     * @returns
     */
    get(key:string){
      try{
       let parseValue=this.localStorage.getStorageSync(key);
       if(!parseValue)return null;
       if(parseValue?.setTime){
        if(!this.isExpiry(parseValue)){
            return parseValue.value;
        }else{
            this.localStorage.removeStorageSync(key);
            return null
        }
       }
       return JSON.parse( parseValue)
      }catch(error){
        console.log(error)
      }
    }

    /**
     * 删除指定key的缓存
     * @param key
     */
    remove(key:string){
      try{
        this.localStorage.removeStorageSync(key);
      }catch(error){
        console.log(error)
      }
    }

    /**
     * 移除全部缓存
     */
    clear(){
        try{
          this.localStorage.clearStorageSync();
        }catch(error){
            console.log(error);
        }
    }

    /**
     * 查询当前缓存
     */
    has(key:string):boolean{
     return !!this.localStorage.getStorageSync(key);
    }

    /**
     * 是否过期
     * @param value
     * @returns
     */
    private isExpiry(value:ValueParams):boolean{
        return value.setTime+value.expiryTime >=Date.now();
    }
}

export const storage =new localStorate();