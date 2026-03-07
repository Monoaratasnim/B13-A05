
document.getElementById("loginBtn").addEventListener("click",function(){
const username = document.getElementById("inputName").value;
const password = document.getElementById("password").value;

const correctUsername = "admin";
const correctPassword = "admin123";

if(username === "" || password === ""){
    alert("Please fill in all fields");
    return;
}


if(username === correctUsername && password === correctPassword){
    alert("Login Successful!");
    window.location.href = "home.html";
}
else{
    alert("Invalid username or password");
}

});
