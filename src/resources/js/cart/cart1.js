
let cartIcon = document.querySelector('.pay-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let noteIcon = document.getElementsByClassName("notification-icon")
noteIcon[0].onclick = () => {

    if (cart.classList.contains('activeIcon')) {
        cart.classList.remove('activeIcon')
    } else {
        cart.classList.add('activeIcon')
    }
}
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
        buttonAdd.addEventListener('click', addCartClicked)

    }

}


function removeCartItem(event) {

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

function addCartClicked(event) {

    var button = event.target.parentElement;
    var buttonParent = button.parentElement;
    //
    console.log(button)
    button.onclick = () => {
        if (cart.classList.contains('activeIcon')) {
            return
        } else {
            cart.classList.add('activeIcon')
        }
    }
    var shopProduct = buttonParent.parentElement
    //

    var title = shopProduct.getElementsByClassName("name_package")[0].innerText
    var price = shopProduct.getElementsByClassName("price")[0].innerText
    var productImg = shopProduct.querySelector(".product_info-img > a > img").src


    addProductToCart(title, price, productImg)
    updateTotal()
}

// 
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box")
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart__product-title");
    var cartInputPrice = cartItems.getElementsByClassName("cart-quantity");
    for (let i = 0; i < cartItemsNames.length; i++) {



        if (cartItemsNames[i].innerText.toLowerCase() === title.toLowerCase()) {



            cartInputPrice[i].value = Number(cartInputPrice[i].value) + 1
            return
        }
    }
    var cartBoxContent = `
                        <img src="${productImg}"alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart__product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>
    `

    cartShopBox.innerHTML = cartBoxContent;

    cartItems.append(cartShopBox)

    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem)
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged)





    // update total


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
