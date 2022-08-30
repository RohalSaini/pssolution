const brandRef = document.getElementById("brands");
const categoryRef = document.getElementById("category");
const quantityRef = document.getElementById("quantity");
const productIdRef = document.getElementById("productId");
const nameRef = document.getElementById("name");
const priceRef = document.getElementById("price");
const discountRef = document.getElementById("discount");
const ourPriceRef = document.getElementById("ourPrice");
const imageIdRef = document.getElementById("imageId");

const notificationRef = document.getElementById("notification");
const headingRef = document.getElementById("msg");
const formRef = document.getElementById("form");

const removeAllOptions = (label) => {
  while (label.options.length) {
    label.remove(0);
  }
}

const addOption = (value,label) => {
  var option = document.createElement("option");
  option.text = value;
  label.add(option);
}



// on reload page
async function showList() {
  try {
    const product = JSON.parse(localStorage.getItem("item"));
    console.log(product);
    
    // brand added
    removeAllOptions(brandRef);
    addOption(product.brand,brandRef);

    // category added
    removeAllOptions(categoryRef);
    addOption(product.category,categoryRef);

    // qunatity added
    removeAllOptions(quantityRef);
    addOption(product.quantity,quantityRef);

    // productId
    removeAllOptions(productIdRef);
    addOption(product.productId,productIdRef);

    // name 
    removeAllOptions(nameRef);
    addOption(product.name,nameRef);

    //price
    removeAllOptions(priceRef);
    addOption(product.price,priceRef);

    // discount
    removeAllOptions(discountRef);
    addOption(product.discount,discountRef);

    // ourPrice
    removeAllOptions(ourPriceRef);
    addOption(product.ourPrice,ourPriceRef);

    imageIdRef.onclick = () => {
      location.href = `images/${product.image}`
    }

  }catch(error) {
    console.log("empty")
  }
}
showList();