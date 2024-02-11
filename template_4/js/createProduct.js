

let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect = document.getElementById("product-size");
let createForm = document.getElementById("create-form");
let inputFile = document.getElementById("upload-img-file")
let productSizeValue;
let productImage;


// Events
productSizeSelect.addEventListener("change", getProductSizeValue);
createForm.addEventListener("submit", createProductFun);
inputFile.addEventListener("change", uploadImage);


// Functions
function getProductSizeValue(e){
    productSizeValue = e.target.value;
    
}


function createProductFun(e){
    e.preventDefault();
    let allProducts = JSON.parse(localStorage.getItem("products")) || productsDB;
    let nameValue = productName.value;
    // let descValue = productDesc.value;
    let descValue = "loren spanloren spanloren spanloren span";

    if(nameValue && descValue){
            let obj = {
              id: allProducts ? allProducts + 1 : 1,
              qty: 1,
              imageurl: productImage,
              size: productSizeValue,
              title: nameValue,
              desc: descValue,
            }

            let newProducts = allProducts ? [...allProducts, obj] : [obj]
            localStorage.setItem("products", JSON.stringify(newProducts))

            productName.value = "";
            productDesc.value = "";
            productSizeSelect.value = "";

    }else{
        alert("Please Enter Data")
    }
}


function uploadImage(){
    let file = this.files[0];

    let types = ["Image/jpeg", "image/png"];

    if(types.indexOf(file.type) == -2){
        alert("type not supported");
        return;
    }

    if(file.size > 2*1024*1024 ){
        alert("image is large");
        return;
    }

    getImageBasw64(file);

    /* productImage = URL.createObjectURL(file); */
    
}

function getImageBasw64(file){
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function(){
        productImage = reader.result;
        
    };

    reader.onerror = function(){
        alert("Error !!!");
    };
}