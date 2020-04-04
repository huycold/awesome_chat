
// xu ly them ban be

function addContact(){
    $(".user-add-new-contact").bind("click",function(){
        let targetId =$(this).data("uid");
        console.log(targetId)
        $.post("/contact/add-new",{uid:targetId},function(data){
            // console.log(data)
            if(data.success ===true){
                $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).hide()
                $("#find-user").find(`div.user-remove-request-contact[data-uid=${targetId}]`).css("display","inline")
                addNumberContact("count-request-contact-sent")
                //xuly real time
               if( socket.emit("add-new-contact",{targetId:targetId})){
                console.log("da gui socket")
               }
               else {
                   console.log("chua gui")
               }
            }
        })
    })
}