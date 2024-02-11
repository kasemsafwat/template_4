let productsDom = document.querySelector(".products")
let noProductItems = document.querySelector(".noProducts")

function drawFavoritesProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productsFavorite")).length === 0)
    noProductItems.innerHTML = "there is no items !!"

  let products =
    JSON.parse(localStorage.getItem("productsFavorite")) || allProducts
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
                    <button class="add-to-cart" onclick="removeFromFavorite(${item.id})" >Remove From Favorite </button>
                </div>
            </div>
        `
  })

  productsDom.innerHTML = productUI.join("")
}

drawFavoritesProductsUI();

function removeFromFavorite(id) {
  let productsFavorite = localStorage.getItem("productsFavorite")
  if (productsFavorite) {
    let items = JSON.parse(productsFavorite)
    let filteredItems = items.filter((item) => item.id !== id)
    localStorage.setItem("productsFavorite", JSON.stringify(filteredItems))
    drawFavoritesProductsUI(filteredItems)
  }
}

/* function removeFromCart(id) {
  if (productsFavorite) {
    let items = JSON.parse(productsFavorite)
    filteredItems = items.filter((item) => item.id !== id);
    drawCartProductsUI(filteredItems);
    localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
  }
} */
