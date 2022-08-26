const lists = document.getElementById('list');       //search item
const data = document.getElementsByClassName('tm-gallery-item');
const search_btn = document.getElementById('search_btn');       //search item
const searchtext = document.getElementById('searchtext');
const filter_button = document.querySelectorAll('.options-items .filter');
const element_product = document.querySelectorAll('.tm-gallery-item');

let jsonData = [];
let ArraySort = [];


$(document).ready(function () {
    Slick();
    SalesManager();
    /*Phần đổi màu các options (All, Food, Drink, Essentials) */
    $('.tm-gallery-links .options-items > li').click(function (e) {
        $('.tm-gallery-links .options-items> li').removeClass('active');
        $(this).addClass('active');
        paging("pagination", window.location.href.split("/").at(-1), itemcount / 12, 1);
        displayItem();
        Slick();
    });

    /*Phần đổi màu số trang web*/
    $('.tm-paging > a').click(function (e) {
        $('.tm-paging > a').removeClass('active');
        $(this).addClass('active');
    });

    /*Đổi màu thẻ li sidebar*/
    $('.menu-links > li').click(function (e) {
        $('.menu-links > li').removeClass('active');
        $(this).addClass('active');
    });
});



// // thuật toán phân trang
// /*
//     item : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
//     1: 0, 1, 2
//     2: 3, 4, 5
//     3: 6, 7, 8
//     4: 9, 10, 11
//     5: 12, 13
//     itemPerPage : 3, currentPage = 1
//     start = 0, end = itemPerPage
//     start = (currentPage-1) * itemPerPage;
//     end = currentPage * itemPerPage;
//     1 : CurrentPage = 1, start = (1-1) * 3 = 0, end = 1 * 3 = 3     => start=0, end=3
//     2 : CurrentPage = 2, start = (2-1) * 3 = 3, end = 2 * 3 = 6     => start=3, end=6
//     3 : CurrentPage = 3, start = (3-1) * 3 = 6, end = 3 * 3 = 9     => start=6, end=9

// */

/*Phần hiện nhiều sản phẩm trên 1 item */
function Slick() {
    $('.image_collection').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: `<button type='button' class='slick-prev slick-arrow'><i class='bx bx-chevron-left icon'></i></button>`,
        nextArrow: `<button type='button' class='slick-next slick-arrow'><i class='bx bx-chevron-right icon'></i></button>`,
        dots: true,
    });
}

function SalesManager() {
    // Modal
    const purchased = document.getElementById('purchased');
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("cart");
    var close_modal = document.getElementsByClassName("close_modal")[0];
    // tại sao lại có [0] như  thế này bởi vì mỗi close là một html colection nên khi mình muốn lấy giá trị html thì phải thêm [0]. 
    //Nếu mình có 2 cái component cùng class thì khi[0] nó sẽ hiển thị component 1 còn[1] thì nó sẽ hiển thị component 2.
    var close_footer = document.getElementsByClassName("close-footer")[0];
    var order = document.getElementsByClassName("order")[0];
    btn.onclick = function () {
        modal.style.display = "block";
    }
    close_modal.onclick = function () {
        modal.style.display = "none";
    }
    close_footer.onclick = function () {
        modal.style.display = "none";
    }
    order.onclick = function () {
        var account_permission = document.querySelector('.account-permission').innerText;
        var cart_item = document.getElementsByClassName("cart-items")[0];
        var cart_rows = cart_item.getElementsByClassName("cart-row");
        var name_package = document.querySelectorAll(".name-package");
        var amount_package = document.getElementsByClassName("amount")[0];
        var CreditCharge = document.getElementsByClassName("CreditCharge")[0].innerText;

        for (var i = 0; i < cart_rows.length; i++) {
            var cart_row = cart_rows[i]
            var price_item = cart_row.getElementsByClassName("cart-price")[0].innerText
            var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
            var damua = quantity_item.value // lấy giá trị trong thẻ input
            var image_item = cart_row.getElementsByClassName("cart-item-image")[0].src
            var name_item = cart_row.getElementsByClassName("cart-item-title")[0].innerText
            var temp = cart_row.getElementsByClassName("cart-item-title")[0]
            var total;
            console.log('tiền:',parseFloat(price_item) * parseFloat(CreditCharge))
            if (parseFloat(account_permission) < parseFloat(price_item) * parseFloat(CreditCharge) ) {
                alert("Bạn không đủ tiền. Vui lòng nạp thêm tiền vào tài khoản");
                return;
            }

            else if (parseFloat(account_permission) >= parseFloat(price_item)) {
                if (name_item == $('.name_package').text()) {
                    total = parseFloat(amount_package.innerText) + damua;
                    return total;
                }
                else {
                    var content = `
                        <div class="product_info">
                        <div class="product_info-img">
                            <div class="image_collection">
                                <img name="purchasedImages" class="image1"
                                    src="${image_item}" alt="${name_item}">
                            </div>
                        </div>
                        <div class="info">
                            <p name="purchasedNames" class="name_package">${name_item}</p>
                            <div class="info_content">
                                <div class="amount_content">
                                    <p class="amount-text">Number of packages: </p>
                                    <p name="purchasedAmounts" class="amount">${damua}</p>
                                </div>
                                <p class="price_text">Price:</p>
                                <p name="purchasedPrices" class="price">${price_item}</p>
                            </div>
                        </div>
                        </div>
                        `
                    $("#lists").append(content)
                }
            }
        }
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // xóa cart
    var items_amount = document.getElementsByClassName("items_amount");
    var remove_cart = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < remove_cart.length; i++) {
        var button = remove_cart[i]
        button.addEventListener("click", function (event) {
            var button_remove = event.target
            button_remove.parentElement.parentElement.remove()
        })
    }

    // update cart 
    function updatecart() {
        var cart_item = document.getElementsByClassName("cart-items")[0];
        var cart_rows = cart_item.getElementsByClassName("cart-row");
        items_amount[0].innerText = cart_rows.length;
        var total = 0;
        for (var i = 0; i < cart_rows.length; i++) {
            var cart_row = cart_rows[i]
            var price_item = cart_row.getElementsByClassName("cart-price ")[0]
            var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
            var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
            var quantity = quantity_item.value // lấy giá trị trong thẻ input
            total = total + (price * quantity)
        }
        document.getElementsByClassName("cart-total-price")[0].innerText = total.toLocaleString() + ' VNĐ'
        // Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].
    }

    // thay đổi số lượng sản phẩm
    var quantity_input = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantity_input.length; i++) {
        var input = quantity_input[i];
        input.addEventListener("change", function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            updatecart()
        })
    }
    // Thêm vào giỏ
    var add_cart = document.getElementsByClassName("buy-button");
    for (var i = 0; i < add_cart.length; i++) {
        var add = add_cart[i];
        add.addEventListener("click", function (event) {
            var button = event.target;
            var product = button.parentElement.parentElement;
            var img = product.parentElement.getElementsByClassName("image1")[0].src;
            var title = product.getElementsByClassName("name_package")[0].innerText;
            var price = product.getElementsByClassName("price")[0].innerText;
            var amount = product.getElementsByClassName("amount")[0].innerText;
            var idItem = product.getElementsByClassName("idItem")[0].innerText;


            addItemToCart(idItem, title, price, amount, img);

            //Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
            // modal.style.display = "block";

            updatecart();
        })
    }

    function addItemToCart(id, title, price, amount, img) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cart_title = cartItems.getElementsByClassName('cart-item-title')
        //Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
        for (var i = 0; i < cart_title.length; i++) {
            if (cart_title[i].innerText == title) {
                alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
                return
            }
        }
        /*Số lượng mặt hàng đã mua*/
        var count_items = document.getElementsByClassName("cart-item");
        var cartRowContents = `
                            <p class="cart-stt cart-column">${count_items.length}</p>  
                        <div class="cart-item cart-column">
                            <img class="cart-item-image" src="${img}" width="100" height="100">
                            <input name="idItem" style="display:none" value="${id}">
                            <span class="cart-item-title">${title}</span>
                        </div>
                        <span class="cart-price cart-column">${price}</span>
                        <div class="cart-quantity cart-column">
                            <input name="amountItem" class="cart-quantity-input" type="number" value="1">
                            <button class="btn btn-danger" type="button">Xóa</button>
                        </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function (event) {
            var button_remove = event.target
            button_remove.parentElement.parentElement.remove()
            updatecart()
        })
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            if (input.value > parseFloat(amount)) {
                input.value = parseFloat(amount);
            }
            updatecart()
        })
        items_amount[0].innerText = count_items.length - 1;
    };

    function addPackageToCart(id, title, price, amount, img) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cart_title = cartItems.getElementsByClassName('cart-item-title')
        //Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
        for (var i = 0; i < cart_title.length; i++) {
            if (cart_title[i].innerText == title) {
                alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
                return
            }
        }
        /*Số lượng mặt hàng đã mua*/
        var count_items = document.getElementsByClassName("cart-item");
        var cartRowContents = `
                            <p class="cart-stt cart-column">${count_items.length}</p>  
                        <div class="cart-item cart-column">
                            <img class="cart-item-image" src="${img}" width="100" height="100">
                            <input name="idPackage" style="display:none" value="${id}">
                            <span class="cart-item-title">${title}</span>
                        </div>
                        <span class="cart-price cart-column">${price}</span>
                        <div class="cart-quantity cart-column">
                            <input name="amountItem" class="cart-quantity-input" type="number" value="1">
                            <button class="btn btn-danger" type="button">Xóa</button>
                        </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function (event) {
            var button_remove = event.target
            button_remove.parentElement.parentElement.remove()
            updatecart()
        })
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            if (input.value > parseFloat(amount)) {
                input.value = parseFloat(amount);
            }
            updatecart()
        })
        items_amount[0].innerText = count_items.length - 1;
    }
}


$('.slSpham').click(function () {
    var temp = 0;
    for(var i=0; i < $('.slSpham').length; i++){
        temp  += (parseFloat($('.slSpham')[i].value) * parseFloat($('.priceSP')[i].value)) * 80/100
    }
    $('.priceTotal').val(temp.toLocaleString() +' '+ 'VNĐ');
});
