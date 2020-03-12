export const transValidation ={
    email_err:"email sai ",
    gender_err:"sai ",
    password_err:" mat khau sai",
    password_cf:"nhập mật khẩu chưa chính xác "
}
export const transErrors ={
    account_err:"email đã được sử dụng",
    isNotActive:"email chưa được kích hoạt"
}
export const transSuccess ={

    userCreated:(userEmail)=>{
        return "Tai khoan <strong> $(userEmail) </strong> vui long kiem tra email de active truoc khi dang nhap"
    }
}