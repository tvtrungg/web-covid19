let allTr = document.querySelectorAll('tbody tr');

let logoUser = document.querySelector('.admin__info-logo img')
let nameUserGenneral = document.querySelector('.admin__general-info ul li span')

let userInfoLi = document.querySelectorAll('.admin__general-info ul li span')

allTr.forEach(function (element, id) {
    if (id === 0) {
        userInfoLi[0].innerText = element.children[1].innerText
        userInfoLi[1].innerText = element.children[2].innerText
        userInfoLi[2].innerText = element.children[3].innerText
        userInfoLi[3].innerText = element.children[4].innerText
        userInfoLi[4].innerText = element.children[5].innerText

        nameUserGenneral.innerText = element.children[1].innerText;
    }
    element.addEventListener("click", function () {
        userInfoLi[0].innerText = element.children[1].innerText
        userInfoLi[1].innerText = element.children[2].innerText
        userInfoLi[2].innerText = element.children[3].innerText
        userInfoLi[3].innerText = element.children[4].innerText
        userInfoLi[4].innerText = element.children[5].innerText
        nameUserGenneral.innerText = element.children[1].innerText;

    });
});


let editUser = document.querySelector('.edit__user')
var handleEditUser = () => {
    if (editUser.style.display !== "none") {
        editUser.style.display = "none";
    } else {
        editUser.style.display = "block";
    }
}

