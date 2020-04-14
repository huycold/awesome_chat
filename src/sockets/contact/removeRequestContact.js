import {pushSocketIdToArray,emitNotifyToArray,removeSocketIdToArray} from "./../../helper/socketHelper"
let removeRequestContact  = (io)=>{
    let clients = {}
    io.on("connection",(socket)=>{
        // tao socket id bai 22
        let currentUserId = socket.request.user._id
       clients = pushSocketIdToArray(clients,currentUserId,socket.id)
        // console.log(clients)
        socket.on("remove-request-contact",(data)=>{
        
            let currenUser = {
                id:socket.request.user._id
            
            }
            // console.log(clients[data.contactId])
            if(clients[data.contactId]){
                emitNotifyToArray(clients,data.contactId,io,"response-request-contact",currenUser)
            }
            // io.sockets.emit("response-add-new-contact",currenUser)
        })
        //remove socket 
        socket.on("disconnect",()=>{
        //     clients[currentUserId] =clients[currentUserId].filter((socketId)=>{
        //         return socketId!= socket.id
        //     })
        // if(!clients[currentUserId].length){
        // delete clients[currentUserId]
        // }    ]
       clients= removeSocketIdToArray(clients,currentUserId,socket)
        })
        console.log(clients)
    })
}
module.exports = removeRequestContact