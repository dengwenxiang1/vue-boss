import io from 'socket.io-client'
import {initUserStore} from '@/store/initUser'
/*单例对象
1.创建对象之前：判断对象是否已经存在,只有不存在才去创建
2创建对象之后：保存对象
*/ 
export function initIo(userid:string|number) {
    if (!io.socket) {
        // 连接服务器, 得到代表连接的 socket 对象
        io.socket = io('ws://localhost:4000',{
            withCredentials: true
        })
    }
    //绑定监听，接收服务器发送的消息
    io.socket.on('receiveMsg', function (chatMsg:any) {

        // console.log('客户端接收到服务器发送的消息', chatMsg)
        //只有当chatMsg是与当前用户相关的消息，才去分发同步action保存消息
        if (userid === chatMsg.from || userid === chatMsg.to) {
           const {updataMsgList} =initUserStore();
           console.log(chatMsg)
           updataMsgList(chatMsg);
        }
    })
}

//发送消息的异步action
export const sendMsg = (from:number, to:number, content:any ) => {
        //发消息
        io.socket.emit('sendMsg', { from, to, content })

}