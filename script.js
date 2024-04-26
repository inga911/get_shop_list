const main = document.querySelector('.main')
const countProducts = document.querySelector('.count')
const shoppingCart = document.querySelector('.shop-cart')
const goBack = document.querySelector('.back-link')
const showCart = document.getElementById('showCart')
const totalPriceBox = document.querySelector('.total-price-box')
const totalPrice = document.querySelector('.total')

const cardLayoutBtn = document.getElementById('card-layout')
const listLayoutBtn = document.getElementById('list-layout')


let products = []
let countCart = 0
let shoppingArr = []
let total = 0
main.classList.add('card-layout')
shoppingCart.classList.add('d-none')
totalPriceBox.classList.add('d-none')
goBack.classList.add('d-none')

showCart.onclick = () => {
    shoppingCart.classList.remove('d-none')
    main.classList.add('d-none')
    totalPriceBox.classList.remove('d-none')
    goBack.classList.remove('d-none')
    cardLayoutBtn.classList.add('d-none')
    listLayoutBtn.classList.add('d-none')
}
goBack.onclick = () => {
    shoppingCart.classList.add('d-none')
    main.classList.remove('d-none')
    goBack.classList.add('d-none')
    totalPriceBox.classList.add('d-none')
    cardLayoutBtn.classList.remove('d-none')
    listLayoutBtn.classList.remove('d-none')
}
cardLayoutBtn.onclick = () => {
    main.classList.add('card-layout')
    main.classList.remove('list-layout')
}
listLayoutBtn.onclick = () => {
    main.classList.add('list-layout')
    main.classList.remove('card-layout')
}


function appendProducts(arr) {
    main.innerHTML = ''
    arr.forEach(card => {
        main.innerHTML += `
            <div class="card-layout card">
                <img src="${card.image}" alt="">
                <div class="title">${card.title}</div>
                <div class="price">${card.price}</div>
                <div class="description">${card.description}</div>
                <button class="add"><span class="material-symbols-outlined">
                add_shopping_cart
                </span></button>
            </div>`
    })

    const addBtn = document.querySelectorAll('.add')
    addBtn.forEach((btn, index) => {
        btn.onclick = () => {
            const addedProduct = arr[index];
            if (!shoppingArr.some(item => item.title === addedProduct.title)) {
                countCart++;
                countProducts.textContent = countCart;
                shoppingArr.push(addedProduct);
                countProducts.classList.remove('cart-fade-animation');
                void countProducts.offsetWidth;
                countProducts.classList.add('cart-fade-animation');
                if (countCart > 0) {
                    shoppingCart.textContent = `You have ${countCart} product${countCart > 1 ? 's' : ''}`;
                }
            }
            updateShoppingCart();
            total += addedProduct.price;
            totalPrice.textContent = total.toFixed(2);
        }
    })
}




function updateShoppingCart() {
    if (countCart > 0) {
        shoppingCart.innerHTML = `<h3>In Your Shopping Cart: <span> ${countCart}</span> </h3>`
        shoppingArr.forEach(item => {
            shoppingCart.innerHTML += `
                    <div class="cart-item">
                        <div class="item-info">
                            <img src="${item.image}" alt="">
                            <span class="cart-item-title-price">${item.title} <span class="material-symbols-outlined">
                            remove
                            </span> <b>$${item.price}</b></span>
                        </div>
                        <button class="delete-item"><span class="material-symbols-outlined">
                        close
                        </span></button>
                    </div> `
        })
        const removeItemBtn = document.querySelectorAll('.delete-item')
        removeItemBtn.forEach((btn, index) => {
            btn.onclick = () => {
                shoppingArr = shoppingArr.filter((x, i) => i !== index)
                total = shoppingArr.reduce((acc, item) => acc + item.price, 0)
                countCart = shoppingArr.length
                countProducts.textContent = countCart
                totalPrice.textContent = total.toFixed(2)
                updateShoppingCart();
            }
        })
    } else {
        shoppingCart.innerHTML = "<p>Your shopping cart is empty.</p>";
    }
}

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        products = data
        appendProducts(products)
    })
