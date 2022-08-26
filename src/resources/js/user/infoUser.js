const user = document.getElementById('User');
const shopping = document.getElementById('Shopping');
const displayUser = document.getElementById('display_User');
const displayShopping = document.getElementById('display_Shopping');


user.addEventListener('click', function (e) {
    displayShopping.style.display = 'none';
    displayUser.style.display = 'block';
});

shopping.addEventListener('click', function (e) {
    displayShopping.style.display = 'block';
    displayUser.style.display = 'none';
});

$('.tm-gallery-links .options-itemUsers > li').click(function (e) {
    $('.tm-gallery-links .options-itemUsers> li').removeClass('active');
    $(this).addClass('active');
});
