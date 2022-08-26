const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";

    }
});
const home = document.querySelector(".home")
const sideBar = document.querySelector(".sidebar")
const content = document.querySelector(".content")

const main = document.querySelector("#main")




if (main || content) {
    sideBar.style.display = "none";
    if (home != null) {
        home.style.display = "none"
    }
} else {
    if (home != null) {
        home.style.display = "block"
    }

}
const modeToggle = document.querySelector(".drak-light");
if (modeToggle != null) {
    modeToggle.addEventListener("click", () => {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");
        if (!body.classList.contains("dark")) {
            localStorage.setItem("mode", "light-mode");
        }
        else {
            localStorage.setItem("mode", "dark-mode");
        }
    })
}

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
if (signUp != null && login != null) {
    signUp.addEventListener("click", () => {
        content.classList.add("active");

    });
    login.addEventListener("click", () => {
        content.classList.remove("active");

    });
}
