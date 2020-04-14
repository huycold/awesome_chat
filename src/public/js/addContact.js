
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
socket.on("response-add-new-contact",(user)=>{
    // console.log("da nhan duoc soc ket")
    let thongbao =`<span data-uid="${ user.id }">
    <img class="avatar-small" src="../images/users/${user.avatar}" alt=""> 
    <strong>${user.username}</strong> đã gửi cho bạn một lời mời kết bạn!
</span><br><br><br>`
    // console.log(thongbao)
$(".noti_content").prepend(thongbao)
// $( ".nti_content" ).append( "<p>Test</p>" );
    addNumberContact("count-request-contact-received")
   addNumberThongbao("noti_counter")
   addNumberThongbao("noti_contact_counter")


})
