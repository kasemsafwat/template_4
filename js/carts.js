
let productsDom = document.querySelector(".products");
let noProductItems = document.querySelector(".noProducts");





function drawCartProductsUI(allProducts = []) {

    if(JSON.parse(localStorage.getItem("productsInCart")).length === 0)
    noProductItems.innerHTML = "there is no items !!";
    
    let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts;
  let productUI = products.map((item) => {
    return `
            <div class="product-items">
                <img src="../${item.imageurl}" class="product-items-image" alt="image">
                <div class="product-item-desc">
                    <h2>${item.title}</h2>
                    <p>${item.desc} </p>
                    <span>Size : ${item.size}</span> <br>
                    <span>Quntaty : ${item.qty}</span>
                </div>

                <div class="product-items-actions">
                    <button class="add-to-cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
                </div>
            </div>
        `
  })


  productsDom.innerHTML = productUI.join("")
}


drawCartProductsUI();


function removeFromCart(id){
    let productsInCart = localStorage.getItem("productsInCart");
    if (productsInCart) {
      let items = JSON.parse(productsInCart)
      let filteredItems = items.filter((item) => item.id !== id)
      localStorage.setItem("productsInCart", JSON.stringify(filteredItems))
      drawCartProductsUI(filteredItems);
    }
}




/* function removeFromCart(id) {
  if (productsInCart) {
    let items = JSON.parse(productsInCart)
    filteredItems = items.filter((item) => item.id !== id);
    drawCartProductsUI(filteredItems);
    localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
  }
} */