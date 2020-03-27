let userAvatar =null;
let userInfo ={}
let originUserInfo ={}
let userUpdatePassword ={}
function updateUser (){
    $("#input-change-avatar").bind("change",function(){
        let fileData =$("#input-change-avatar").prop("files")[0]
        let math = ["image/png","image/jpg","image/jpeg"]
        let limit =1048576 // byte = 1mb
        if($.inArray(fileData.type,math)=== -1){
            alertify.notify("kieu file k hop le","error",7)
            $(this).val(null)
            return false ;
        }
        if(fileData.size >limit){
            alertify.notify("anh toi da M tmb","error",7)
            $(this).val(null)
            return false ;
        }
        if(typeof(FileReader)!=undefined){
            let imagePreview = $("#image-edit-profile");
            imagePreview.empty();
            let fileReader = new FileReader();
            fileReader.onload = function(element){
                $("<img>",{
                    "src":element.target.result,
                    "class":"avatar img-circle",
                    "alt":"avatar",
                    "id":"user-modal-avatar"
                }).appendTo(imagePreview);
            }
            imagePreview.show();
            fileReader.readAsDataURL(fileData);
            let formData = new FormData();
            formData.append('avatar',fileData)
            userAvatar = formData
        }
        else{
            alertify.notify("Trinh duy k ho tro fileReader","error",7)
        }
    })
    $("#input-change-username").bind("change",function () {
        userInfo.username = $(this).val()
      })
      $("#input-change-gender-male").bind("click",function () {
        userInfo.gender= $(this).val()
      })
      $("#input-change-gender-female").bind("click",function () {
        userInfo.gender= $(this).val()
      })
      $("#input-change-address").bind("change",function () {
        userInfo.address= $(this).val()
      })
      $("#input-change-phone").bind("change",function () {
        userInfo.phone = $(this).val()
      })

}
function callUpdateUserAvatar(){
    $.ajax({
        url:"/user/update-avatar",
        type:"put",
        processData:false,
        cache:false,
        contentType:false,
        data:userAvatar,
        success: function(result){
            // $(".user-modal-alert-success").find("span").text(result.message)
            // $(".user-modal-alert-success").css("display","block")


            // $("#navbar-avatar").attr("src",result.imageSrc)
            // origin
        },
        error:function(error)
        {
            $("#input-btn-cancel-user").click()
        },
    


    })
}

$(document).ready(function(){
    
    originUserInfo ={
       username:$("#input-change-username").val(),
       gender: ( $("#input-change-gender-male").is(":checked"))?$("#input-change-gander-male"): $("#input-change-gender-female").is(":checked").val(),
       address:$("#input-change-address").val(),
       phone:$("#input-change-phone").val(),

    }
   
    updateUser();
    $("#input-btn-update-user").bind("click",function(){
        if($.isEmptyObject(userInfo)&& !userAvatar){
            alertify.notify("Ban phai thay doi thong tin truoc khi cap nhat","error",7);
            return false
        }
        if(userAvatar){
            callUpdateUserAvatar()
        }
        if(!$.isEmptyObject(userInfo)){
            callUpdateUserInfor()
        }
    
    })
    
    $("#input-btn-cancel-user").bind("click",function(){
        userInfo = {}
        userAvatar = null
        $("#input-change-username").val(originUserInfo.username)
    //    (originUserInfo.gender ==="male") ? $("#input-change-gender-male").click(): $("#input-change-gender-female").click()
       $("#input-change-address").val(originUserInfo.address);
       $("#input-change-phone").val(originUserInfo.phone)
    })

   
   
})