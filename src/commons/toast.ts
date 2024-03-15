type ToastOptions=UniNamespace.ShowToastOptions|string;

class UniToast{
    private config:UniApp.ShowToastOptions;

    constructor(){
        this.config={
            title:'_',
            duration:2000
        }
    }

    private setToast(
        options:ToastOptions,
        icon:'success' | 'loading' |'error'|'none'|undefined
    ){
        if(typeof options !=='object'){
            this.config.title=String(options);
        }else{
            Object.assign(this.config,options)
        }
        this.config.icon=icon;
        return uni.showToast(this.config)
    }
    
    message(options:ToastOptions){
        return this.setToast(options,'none');
    }
    success(options:ToastOptions){
        return this.setToast(options,'success')
    }
    error(options:ToastOptions){
        return this.setToast(options,'error')
    }
    loading(options:ToastOptions){
        return this.setToast(options,'loading')
    }
}
export const toast=new UniToast();