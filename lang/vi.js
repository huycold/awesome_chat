export const transValidation ={
    email_err:"email sai ",
    gender_err:"sai ",
    password_err:" mat khau sai",
    password_cf:"nhập mật khẩu chưa chính xác "
}
export const transErrors ={
    account_err:"email đã được sử dụng",
    isNotActive:"email chưa được kích hoạt",
    login_failed:"Sai tai khoan or mat khau",
    server_error:"server loi kiem tra lai mang"
}
export const transSuccess ={

    userCreated:(userEmail)=>{
        return "Tai khoan <strong> $(userEmail) </strong> vui long kiem tra email de active truoc khi dang nhap"
    },
    loginSuccess:(username)=>{
        return `xin chao ${username}`
    }
}
export const transMail ={
    subject:"xac thuc tai khoan",
    template:(linkVerify)=>{
        return `
        <h3>Vui long click ben duoi de xac thuc tai khoan</h3>
        <h3> <a href="${linkVerify}" target="blank"> ${linkVerify}</h3>
        `
    },
    send_failed:" loi khong gui duoc email"
}
