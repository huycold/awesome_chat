import {pushSocketIdToArray,emitNotifyToArray,removeSocketIdToArray} from "./../../helper/socketHelper"
let addNewContact  = (io)=>{
    let clients = {}
    io.on("connection",(socket)=>{
        // tao socket id bai 22
        let currentUserId = socket.request.user._id
        clients = pushSocketIdToArray(clients,currentUserId,socket.id)
        // console.log(clients)
        socket.on("add-new-contact",(data)=>{
        
            let currenUser = {
                id:socket.request.user._id,
                username:socket.request.user.username,
                avatar:socket.request.user.avatar
            }
            // console.log(clients[data.targetId])
            if(clients[data.targetId]){
                // clients[data.targetId].forEach(socketId =>{
                //     io.sockets.connected[socketId].emit("response-add-new-contact",currenUser)
                // })
                emitNotifyToArray(clients,data.targetId,io,"response-add-new-contact",currenUser)
            }
            // io.sockets.emit("response-add-new-contact",currenUser)
        })
        //remove socket 
        socket.on("disconnect",()=>{
       clients= removeSocketIdToArray(clients,currentUserId,socket)
        })
        // console.log(clients)
    })
}
module.exports = addNewContact;