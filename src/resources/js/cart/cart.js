
let cartIcon = document.querySelector('.pay-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let noteIcon = document.getElementsByClassName("notification-icon")

cartIcon.onclick = () => {

    if (cart.classList.contains('activeIcon')) {
        cart.classList.remove('activeIcon')
    } else {
        cart.classList.add('activeIcon')
    }
}
// if(closeCart =! null){
closeCart.onclick = () => {
    cart.classList.remove('activeIcon')
}

// }



if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {

    ready()
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    for (var i = 0; i < removeCartButtons.length; i++) {
        var buttonRemove = removeCartButtons[i];
        buttonRemove.addEventListener('click', removeCartItem)
    }
    // quality changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')

    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('click', quantityChanged)
    }

    // add to cart
    var addCart = document.getElementsByClassName("info_button")

    for (let i = 0; i < addCart.length; i++) {
        const buttonAdd = addCart[i];
        buttonAdd.addEventListener('click', function (e) {
            var formRestore = document.forms['formCartChoose']
            var idCart = formRestore.getAttribute("data-id")
            var button = e.target.parentElement
            console.log(button.id)
            console.log(button)
            cart.classList.add('activeIcon')
            formRestore.action = '/user/' + idCart + '/choose/' + button.id + '/?_method=PATCH'
            formRestore.submit()
            var shopProduct = button.parentElement

            updateTotal()
        })

    }

    // buy product
    var btnBuy = document.querySelector('.btn-buy')
    console.log(btnBuy)
    btnBuy.addEventListener('click', buy)



    updateTotal()

}

// quậy phá tại đây
var addCart = document.getElementsByClassName("info_button")


    document.addEventListener('click', function (e) {
        
        document.addEventListener('DOMContentLoaded',() => {
            cart.classList.add('activeIcon')
            console.log("ckicj")
        });
            
        })

    
    // cart.classList.add('activeIcon')


function removeCartItem(e) {
    var formRestore = document.forms['formCartCancle']
    var idCart = formRestore.getAttribute("data-id")
    var button = e.target
    console.log(button.id)
    console.log(button)
    cart.classList.add('activeIcon')
    formRestore.action = '/user/' + idCart + '/cancle/' + button.id + '/?_method=PATCH'
    formRestore.submit()

    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updateTotal()
}

//quantyti changes
function quantityChanged(event) {
    let input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    // addProductToCart(title, price, productImg)
    updateTotal()
}


function buy(e) {

    var formRestore = document.forms['formCartBuy']
    var idCart = formRestore.getAttribute("data-id")
    console.log(idCart)
    formRestore.action = '/user/' + idCart + '/buy?_method=PATCH'
    formRestore.submit()
}



function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    let totalQuatity = 0

    if (cartBoxes.length == 0) {
        document.querySelector(".total-price").innerText = "$" + total;
    } else {
        for (var i = 0; i < cartBoxes.length; i++) {
            let cartBox = cartBoxes[i];

            let priceElement = cartBox.getElementsByClassName('cart-price')[0]
            let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
            let price = parseFloat(priceElement.innerText.replace("$", ""))
            let quantity = quantityElement.value;
            total = total + price * quantity;
            document.querySelector(".total-price").innerText = "$" + total;
            totalQuatity = totalQuatity + Number(quantity)
        }
    }
    let noteIcon = document.getElementsByClassName("notification-icon")
    noteIcon[0].children[1].innerText = totalQuatity

}
// update 


