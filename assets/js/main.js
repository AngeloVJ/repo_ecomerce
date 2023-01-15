mixitup(".ecomerce__products", {
    selectors: {
        target: '.product'
    },
    animation: {
        duration: 300
    }
});

{
const dark = document.querySelector(".bx-moon");
const light = document.querySelector(".bx-sun")

dark.addEventListener('click', function(){
    dark.classList.toggle('icon__none')
    light.classList.toggle('icon__inline')
    document.body.classList.toggle('darkmode')
})
light.addEventListener('click', function(){
    light.classList.toggle('icon__inline')
    dark.classList.toggle('icon__none')
    document.body.classList.toggle('darkmode')
})
}

let data = [
    {
        id: "1",
        name: "buzo rojo",
        price: 14,
        stock: 10,
        filter: "red",
        img: "./assets/img/featured1.png",
    },
    {
        id: "2",
        name: "buzo negro",
        price: 20,
        stock: 15,
        filter: "black",
        img: "./assets/img/featured2.png",
    },
    {
        id: "3",
        name: "buzo blanco",
        price: 25,
        stock: 20,
        filter: "white",
        img: "./assets/img/featured3.png",
    },
    {
        id: "4",
        name: "Camisa negra",
        price: 30,
        stock: 10,
        filter: "black",
        img: "./assets/img/featured4.png",
    },
];


{
    const iconShop = document.querySelector(".bx-shopping-bag");
    const contentCart = document.querySelector(".contentCar");

    iconShop.addEventListener("click", function () {
    contentCart.classList.toggle("contentCar__show");
    });
}

const iconClose = document.querySelector(".bx-x");
const iconOpen = document.querySelector(".bx-grid-alt");

[iconClose, iconOpen].forEach((icon) => {
    icon.addEventListener("click", () => menu.classList.toggle('menu__show'))
});
window.addEventListener('scroll', () => {
    console.log();
    if (window.scrollY > 50) {
        headerNavbar.classList.add("header__navbar-animation");
    } else {
        headerNavbar.classList.remove("header__navbar-animation");
    }
});


const menu = document.querySelector(".menu");
const headerNavbar = document.querySelector(".header__navbar");
const ecomerceproducts = document.querySelector(".ecomerce__products");
const cartProducts = document.querySelector(".carProducts");
const carTotal = document.querySelector(".carTotal");
const amountCart = document.querySelector(".amountCart");



let objCart = {};

function printAmountCart() {
    let sum = 0;

    const arrayCart = Object.values(objCart);
    if (!arrayCart.length) {
        amountCart.style.display = "none";
        return;
    }

    amountCart.style.display = "inline-block";
    arrayCart.forEach(function ({ amount }) {
        sum += amount;
    });
    amountCart.textContent = sum;
}

function printTotalCart() {
    const arrayCart = Object.values(objCart);
    if (!arrayCart.length) {
        carTotal.innerHTML = `
            <h3>Carrito vacio</h3>
        `;
        return;
    }

    let sum = 0;
    arrayCart.forEach(function ({ amount, price }) {
        sum += amount * price;
    });
    carTotal.innerHTML = `
            <h3>Total a pagar ${sum}</h3>
            <button class="btn btn__buy">Checkout</button>
        `;
}


function printProductsInCart() {
    let html = "";

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(function ({ id, name, price, img, amount }) {
        html += `
            <div class="carproduct">
                <div class="carproduct__img">
                    <img src="${img}" alt="${name}" />
                </div>

                <div class="carproduct__info">
                    <p>${name}</p>
                    <p>${price}</p>
                    <p>Cant: ${amount}</p>
                </div>

                <div class="carproduct__options" id="${id}">
                    <i class='bx bx-minus'></i>
                    <i class='bx bx-plus'></i>
                    <i class='bx bx-trash' ></i>
                </div>
            </div>
        `;
    });
    cartProducts.innerHTML = html;
}

function printProducts() {
    let html = "";

    data.forEach(({ filter, id, img, name, price, stock }) => {
        html += `
            <div class="product ${filter}">
                <div class="product__img">
                    <img src="${img}" alt="${name}" />
                </div>

                <div class="product__info" id="${id}">
                    <button class="add__cart">+</button>

                    <p>${price} <span> | Stock: ${stock}</span></p>
                    <p>${name}</p>
                </div>
            </div>
    `;
    });

    ecomerceproducts.innerHTML = html;
}
/**/ 
ecomerceproducts.addEventListener("click", function (e) {
    if (e.target.classList.contains("add__cart")) {

        const id = e.target.parentElement.id;

        let findProduct = data.find(function (data) {
            return data.id === id;
        });

        if (objCart[id]) {
            if (findProduct.stock === objCart[id].amount) {
                alert("No tengo mas en stock");
            } else {
                objCart[id].amount++;
            }
        } else {
            objCart[id] = {
                ...findProduct,
                amount: 1,
            };
        }
    }
    printProductsInCart();
    printTotalCart();
    printAmountCart();
});


cartProducts.addEventListener("click", function (e) {
    if (e.target.classList.contains("bx-minus")) {
        const id = e.target.parentElement.id;

        if (objCart[id].amount === 1) {
            const res = confirm("Seguro quieres eliminar este producto");
            if (res) delete objCart[id];
        } else {
            objCart[id].amount--;
        }
    }

    if (e.target.classList.contains("bx-plus")) {
        const id = e.target.parentElement.id;

        let findProduct = data.find(function (data) {
            return data.id === id;
        });

        if (findProduct.stock === objCart[id].amount) {
            alert("No tengo mas en stock");
        } else {
            objCart[id].amount++;
        }
    }

    if (e.target.classList.contains("bx-trash")) {
        const id = e.target.parentElement.id;

        const res = confirm("Seguro quieres eliminar este producto");
        if (res) delete objCart[id];
    }
    printProductsInCart();
    printTotalCart();
    printAmountCart();
});


carTotal.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn__buy")) {
        const res = confirm("Seguro quieres hacer la compra");

        if (!res) return;

        let newArray = [];

        data.forEach(function (data) {
            if (data.id === objCart[data.id]?.id) {
                newArray.push({
                    ...data,
                    stock: data.stock - objCart[data.id].amount,
                });
            } else {
                newArray.push(data);
            }
        });

        data = newArray;
        objCart = {};

        printProducts();
        printProductsInCart();
        printTotalCart();
        printAmountCart();
    }
});
printProducts();
printTotalCart();
printAmountCart();
