let username = document.querySelector("#username");
let password = document.querySelector("#password");
let login_btn = document.querySelector("#signin");

let getuser = localStorage.getItem('username');
let getpassword = localStorage.getItem('password');

login_btn.addEventListener('click', function(e){
    e.preventDefault();
     if (username.value == "" || password.value == "") {
       alert("please fill your data")
     } else if(getuser && getuser.trim() == username.value.trim() && getpassword && getpassword.trim() == password.value.trim()){
            setTimeout(() => {
                window.location = "../index.html";
            },1500)}else{
            alert("user nmae or password is incorrect");
        }
});