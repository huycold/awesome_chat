function callFindUsers(element){
    if(element.which === 13||element.type==="click"){
        let keyword =$("#input-find-users-contact").val()
        console.log(keyword)
        if(!keyword.length){
            alertify.notify("Chua nhap doi dung tim kiem","error",7)
            return false
        }
        $.get(`/contact/find-users/${keyword}`,function(data){
            $("#find-user ul").html(data);
            addContact() // js/addContact.js
            removeRequestContact()
        })
    }
}
$(document).ready(function(){
    
    $("#input-find-users-contact").bind("keypress",callFindUsers)
    $("#btn-find-users-contact").bind("click",callFindUsers)
})
