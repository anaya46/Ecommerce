"use strict"
const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    },
    {
      id: 4,
      name: 'Sweatshirts',
      price: 30.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
      category: 'sweatshirts',
      quantity: 10
    }
]


let listProducts = document.querySelector(".lista-productos")
let cart = []
let cartContainer = document.querySelector(".contenedor-cart")
let cartCount = document.querySelector(".precios-cart")
let contadorCarro = document.querySelector(".cont-compra")

//para acceder al documento completo: mostrar los productos:

document.addEventListener("DOMContentLoaded", () =>{
    mostrarProductos()
    
    if(window.localStorage.getItem("cart")){
        cart = JSON.parse(window.localStorage.getItem("cart"))
        }else{
            window.localStorage.setItem("cart", JSON.stringify([]))
        }
})
//termina

//localStorage







//-----------empieza  mode-dark --------------------


let themeIcon = document.getElementById("moon-button")
let body = document.querySelector("body")

themeIcon.addEventListener("click", (e) =>{
    body.classList.toggle("dark-theme")
   
    let isDark = body.classList.contains("dark-theme")

    if(isDark){
        themeIcon.classList.replace("bx-moon", "bx-sun")
    }else{
        themeIcon.classList.replace("bx-sun", "bx-moon")
    }
})
//-----------termina  mode-dark --------------------

//-----------empieza scroll-header --------------------


let header = document.querySelector("header")

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 56 ){
        header.classList.add("scroll-header")
    }else{
        header.classList.remove("scroll-header")
    }
})

//-----------termina scroll-header --------------------


//----empieza : abre y cierre carta compra ----------

let iconoCarta = document.querySelector(".nav-compra")
let cartOverlay = document.querySelector(".carro-compras-overlay")
let cartClose = document.getElementById("cart-close")

iconoCarta.addEventListener( "click", () =>{
    cartOverlay.classList.add("mostrar")
})

cartClose.addEventListener( "click", () =>{
    cartOverlay.classList.remove("mostrar")
})

//-----termina : abre y cierre carta compra ---------------

//---empieza : para mostrar las cartas de cada producto---

function mostrarProductos(){
    let fragmentHTML = " "

    items.forEach( (product) => {
        fragmentHTML += `
    <div class="carta-producto">
            <div class="contenedor-imagen">
                 <img src=${product.image} alt="">
             </div>
             <div class="info-producto">
                <h2 class="precio">$ ${product.price}.00</h2>
            <h3 class="nombre-producto">${product.name}</h3>
            <button class="boton-productos product-button" data-id="${product.id} "><i class='bx bx-plus-circle bx-md'></i></button>
            </div>
     </div>
     `
    })

    listProducts.innerHTML = fragmentHTML

//-----termina : para mostrar las cartas de cada producto-----

//-----empieza: para agregar al carrito--------

    let productsButton = document.querySelectorAll(".product-button")
    console.log(productsButton)


    productsButton.forEach( (button) =>{
        button.addEventListener("click", (evento) =>{
            let id = parseInt( button.getAttribute("data-id") )
            let product = items.find( item =>{ 
                return item.id === id 
            })
            
            agregarProducto(product)
            
        })
    })
}
function agregarProducto( producto ){

    let resultadoFind = cart.find( item => item.id === producto.id )
    

    if( resultadoFind ){
        let stock = cart[resultadoFind.index].quantity
        let quantitySelected = cart[resultadoFind.index].quantitySelected

        if( stock > quantitySelected ){
            cart[resultadoFind.index].quantitySelected += 1
        }else{
            alert( "No tenemos suficiente inventario" )
        }

    }else{
        producto.quantitySelected = 1
        producto.index = cart.length


        cart.push(producto)
    }

    window.localStorage.setItem("cart", JSON.stringify(cart))

    console.log(cart)
    mostrarProductosCart()
}


function mostrarProductosCart(){

    let fragmentoHTML = ``
    let suma = 0
    let cantidadTotal = 0

    cart.forEach( item =>{
        fragmentoHTML += `
        <div class="cart-item">
            <img src=${item.image} alt="">
            <p>${item.name}</p>
            <small>Cantidad: ${item.quantitySelected}</small>
        </div>
        `

        let totalProducto = item.quantitySelected * item.price 
        suma += totalProducto

        cantidadTotal += item.quantitySelected
    })

    fragmentoHTML += `
    <div class="cart-price">
        <p>Productos seleccionados:${ cantidadTotal }</p>
        <p>Valor Total de la Compra: $${ suma }</p>
    </div>
    `
    contadorCarro.textContent = cantidadTotal
    cartContainer.innerHTML = fragmentoHTML
    cartCount.textContent = cantidadTotal
}


