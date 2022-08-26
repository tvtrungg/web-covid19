

// const content = document.querySelector(".content"),
const pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link"),
    checkbox = document.querySelectorAll(".allow"),
    checkboxLabel = document.querySelectorAll(".allow-label");


// //   js code to show/hide password and change icon
// eyeIcon là cái icon trong khung password
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})


// js code to appear signup and login form
if(signUp){
    signUp.addEventListener("click", () => {
        content.classList.add("active");
        console.log("click");
    });
}

if(login){
    login.addEventListener("click", () => {
        content.classList.remove("active");
        console.log("123");
    });
}

