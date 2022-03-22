class Producto{
    constructor (id, categoria, nombre, precio , color, stock){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.color = color;
        this.stock = stock;
    }
}
const producto1 = new Producto (1,"celular", "Samsung Galaxy S21", 121499, "blanco", 20);
const producto2 = new Producto (2,"celular", "Samsung Galaxy A03s", 35000, "negro", 10); 
const producto3 = new Producto (3, "celular", "Apple Iphone 13 pro", 395129, "oro", 5);
const producto4 = new Producto (4, "celular", "Motorola Edge 20 lite", 69999, "verde", 9);
const producto5 = new Producto (5, "celular", "Xiaomi Redmi Note 10s dual", 54999, "gris grafito", 30);
const producto6 = new Producto  (6,"camara", "Canon PowerShot sx540", 74990, "negro", 12 );
const producto7 = new Producto (7,"camara", "Nikon kit d7500", 455791, "negro", 5 );
const producto8 = new Producto (8,"camara", "Sony H300 Compacta", 69999, "negro", 18 );
const producto9 = new Producto (9,"camara", "kodax Sport Sx540", 6388, "azul/amarilla", 2);
const producto10 = new Producto (10,"camara", "Samsung St64 Compacta", 10999, "negro", 8 );
const producto11 = new Producto (11,"consola", "Microsoft Xbox Serie S", 89999, "blanca", 4);
const producto12 = new Producto (12,"consola", "Sony Playstation 5", 207999, "blanco y negro", 3);
const producto13 = new Producto (13,"notebook", "Hp Notebook 15-DW1080LA", 62999, "negro", 5);
const producto14 = new Producto (14,"notebook", "Exo Notebook Smart XL4-S3542", 76999, "gris", 3);
const producto15 = new Producto (15,"notebook", "Lenovo Notebook IdeaPad 15IML05", 91999, "azul",6);
const producto16 = new Producto (16,"notebook", "Dell Notebook Latitude 3190", 38999, "negro",2);
const producto17 = new Producto (17,"televisor", "Philco Smart TV PLD32HS9A1 LED HD 32", 30399, "negro", 15);
const producto18 = new Producto (18,"televisor", "Samsung Smart TV Series 7 UN50TU7000GCZB LED 4K 50", 83999, "negro", 11);
const producto19 = new Producto (19,"televisor", "Rca Smart TV AND32Y LED HD 32", 30499, "negro", 7);



let arrayProductos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17,producto18,producto19 ]

let divProductos = document.getElementById("divProductos");

arrayProductos.forEach(productosEnArray => {
    divProductos.innerHTML += `
        <div class="card shadow border-primary mb-3 rounded" style="max-width: 20rem;">
            <h5 class="card-title mb-1 pt-2 text-center">${productosEnArray.nombre}</h5>
            <img src="img/${productosEnArray.id}.png" class=" mx-auto imgCard"  alt="...">
            <div class="card-body">
                <p class="card-text description"> ${productosEnArray.categoria} ${productosEnArray.color}</p>
                <h5 class="text-primary">Precio: <span class="precio">$ ${productosEnArray.precio}</span></h5>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary button">Añadir a Carrito</button>
                </div>
            </div>
        </div>
    `
});

const clickButton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody')
let carrito = []

clickButton.forEach(btn => {
    btn.addEventListener( 'click', addToCarritoItem)
} )

function addToCarritoItem (e){
    const button = e.target;
    const item = button.closest('.card');
    const itemTitle =item.querySelector('.card-title').textContent
    const itemPrice = item.querySelector('.precio').textContent
    const itemImg = item.querySelector('.imgCard').src
    
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1     
    }
    addItemCarrito(newItem)
}
function addItemCarrito(newItem){
    
   setTimeout(function() {
    swal("Felicidades!!!", " Tu producto a sido añadido al carrito", "success");
   })
  //Producto añadido al carrito

    const imputElemento = tbody.getElementsByClassName('input__elemento')

    for(let i=0; i < carrito.length; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++
            const inputValue = imputElemento[i].value
            inputValue.value ++
            carritoTotal ()
            return null
        }
       
    }
    carrito.push(newItem);
    renderCarrito()
}
function  renderCarrito(){
   
    tbody.innerHTML =''
    carrito.map(item => {
        const tr = document.createElement('tr'); 
        tr.classList.add('itemCarrito');
        const content = `
        <th scope="row">Active</th>
        <td class="table__productos">
            <img class="imgTable" src=${item.img} alt="">
            <h6 class="title">${item.title} </h6>
        </td>
        <td class="table__precio"><p>${item.precio} </p></td>
        <td class="table__cantidad">
            <input type="number" min="1" value= ${item.cantidad} class="input__elemento">
            <button type="button" class=" delete btn btn-primary">x</button>
        </td>
        `
        tr.innerHTML = content  
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito);   
    } )
    carritoTotal () 
}
function carritoTotal(){ 
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');
    carrito.forEach((item) => { 
        const precio = Number (item.precio.replace("$" ,''))
        total = total + precio*item.cantidad    
    })
    itemCartTotal.innerHTML = `Total $${total} `
    addLocalStorage()
}
function  removeItemCarrito(e){
    const buttonDelete = e.target;
    const tr = buttonDelete.closest(".itemCarrito");
    const title = tr.querySelector('.title').textContent;
  
    for(let i=0; i<carrito.length; i++){
       
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
        }
    }   
    tr.remove()
    carritoTotal()
}


function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function (){
    const storage = JSON.parse(localStorage.getItem('carrito'));

    if(storage){
        carrito = storage;
        renderCarrito()
    }
}