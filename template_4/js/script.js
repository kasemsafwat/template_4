

/**********************************/

// define product


let productsDom = document.querySelector('.products');
let cartProductDom = document.querySelector(".carts-products div");
let cartProductMenu = document.querySelector(".carts-products");
let badgeDom = document.querySelector(".badge");
let shopingCartIcon = document.querySelector(".shoping-cart");
let products = productsDB;




shopingCartIcon.addEventListener("click", oppenCartMenu);


// display products

let drawProductsUI;

drawProductsUI= function (products = []) {
    let productUI = products.map((item) => {
        return `
            <div class="product-items">
                <img src="${
                  item.imageurl
                }" class="product-items-image" alt="image">
                <div class="product-item-desc">
                    <a onclick='saveItemData(${item.id})'>${item.title}</a>
                    <p>${item.desc}</p>
                    <span>Size : ${item.size}</span>
                </div>



                <div class="product-items-actions">
                    <button class="add-to-cart" onclick="addedToCart(${
                      item.id
                    })">Add To Cart</button>
                    <i class="favorite fa-regular fa-heart" style="color: ${
                      item.liked == true ? "red" : ""
                    }" onclick="addToFavorite(${item.id})"></i> 
                </div>
            </div>
        `
    });

    productsDom.innerHTML = productUI.join("");

}

drawProductsUI(JSON.parse(localStorage.getItem("products")) || products);

let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];


if(addedItem){
  addedItem.map(item => {
    cartProductDom.innerHTML += `<p>${item.title}  ${item.qty}</p>` 
  });
  badgeDom.style.display = "block";
  badgeDom.innerHTML += addedItem.length;
}


//add to cart


function addedToCart(id){
        if (localStorage.getItem("username")) {
          let products = JSON.parse(localStorage.getItem("products")) || products;
              let product = products.find((item) => item.id === id);
              let isProductInCart = addedItem.some((i) => i.id === product.id);

              if (isProductInCart) {
                addedItem = addedItem.map((p) => {
                  if(p.id === product.id) p.qty +=1;
                  return p;
                });
              } else {
                addedItem.push(product);
              }
              cartProductDom.innerHTML = "";
              addedItem.forEach((item) => {
                cartProductDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
              });

            // addedItem = [...addedItem , choosenItem];

            // let uniqueProducts = getUniqueArr(addedItem, "id");
            localStorage.setItem("productsInCart", JSON.stringify(addedItem));
              let cartProductItems = document.querySelectorAll(".carts-products div p")
              badgeDom.style.display = "block"
              badgeDom.innerHTML = cartProductItems.length
        } else {
          window.location = "html/Login.html"
        }


}


function getUniqueArr(arr , filterType){
  let unique = arr
  .map((item) => item[filterType])
  .map((item , i , final) => final.indexOf(item) === i && i )
  .filter((item) => arr[item])
  .map((item) => arr[item]);

  return unique;
}


function oppenCartMenu(){
    if (cartProductDom.innerHTML != ""){
        if (cartProductMenu.style.display == "block"){
                cartProductMenu.style.display = "none";

        }else{
            cartProductMenu.style.display = "block";
        }

    } 
}




function saveItemData(id){
  localStorage.setItem('productId', id);
  window.location= "html/cartDetails.html";
}





let input = document.getElementById("search");

input.addEventListener("keyup", function(e){
  search(e.target.value, JSON.parse(localStorage.getItem("products")));

  if(e.target.value.trim() === "")
    drawProductsUI(JSON.parse(localStorage.getItem("products")));
});

function search(title, myArray){

  let arr = myArray.filter((item) => item.title.indexOf(title) !== -1);
  drawProductsUI(arr);
}






// add to favorite 
let FavoriteItems = localStorage.getItem("productsFavorite")
? JSON.parse(localStorage.getItem("productsFavorite"))
 : [];
function addToFavorite(id) {
  if (localStorage.getItem("username")) {
    let choosenItem = products.find((item) => item.id === id);
    choosenItem.liked = true;
    FavoriteItems= [...FavoriteItems, choosenItem];
     let uniqueProducts = getUniqueArr(FavoriteItems, "id")
     localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts))
    products.map(item => {
      if(item.id === choosenItem.id){
        item.liked = true;
      }
    })
    localStorage.setItem("products", JSON.stringify(products));
    drawProductsUI(products);
  } else {
    window.location = "html/Login.html"
  }
}

