const brandRef = document.getElementById("brands");
const categoryRef = document.getElementById("category");
const quantityRef = document.getElementById("quantity");

const notificationRef = document.getElementById("notification");
const headingRef = document.getElementById("msg");
const formRef = document.getElementById("form");

const removeAllOptions = (label) => {
  while (label.options.length) {
    label.remove(0);
  }
};

const addOption = (value, label) => {
  var option = document.createElement("option");
  option.text = value;
  label.add(option);
};

const onSaveProduct = async (event) => {
  event.preventDefault();
  // variables declaration

  if (
    event.target[8].files[0].type == "image/png" ||
    event.target[8].files[0].type == "image/jpg" ||
    event.target[8].files[0].type == "image/jpeg"
  ) {
    //console.log(" corrent image type");
    //console.log("++++++++++++++++++++++++++++++++++++");
    //console.log(" File Name is ", event.target[1].files[0].name);
    //console.log(" File Type is ", event.target[1].files[0].type);
    //console.log(" File Size is ", event.target[1].files[0].size);
    //console.log("+++++++++++++++++++++++++++++++++++++");

    const product = {
      brand: event.target[0].value,
      category: event.target[1].value,
      quantity: event.target[2].value,
      productId: event.target[3].value,
      name: event.target[4].value,
      price: +event.target[5].value,
      discount: +event.target[6].value,
      ourprice: +event.target[7].value,
      photo: event.target[8].value,
    };
    console.table(product);
    console.log(event.target);
    const formData = new FormData();
    formData.append("category", product.category);
    formData.append("productId", product.productId);
    formData.append("quantity", product.quantity);
    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("ourPrice", product.ourprice);
    formData.append("image", event.target[8].files[0]);
    let response = await fetch("/v1/product", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
        'Authorization': 'Bearer '+localStorage.getItem('token')
      },
    });

    if (response.ok) {
      let json = await response.json();
      if (json.status == true) {
        notificationRef.classList.remove("hide");
        notificationRef.classList.add("show");

        headingRef.innerHTML =
          "Product has been added succesfully to the database !!";
        location.href = "/product";
        setTimeout(() => {
          notificationRef.classList.add("hide");
          notificationRef.classList.remove("show");
        }, 3000);
        formRef.reset();
      } else {
        notificationRef.classList.remove("hide");
        notificationRef.classList.add("show");
        headingRef.innerHTML = json.error;

        setTimeout(() => {
          notificationRef.classList.add("hide");
          notificationRef.classList.remove("show");
        }, 3000);
      }
      // console.log("API Login Successfully");
      // notificationRef.classList.remove("hide");
      // notificationRef.classList.add("show");

      // headingRef.innerHTML = "Product has been added succesfully to the database !!";
      // location.href ="/product";
      // setTimeout(() => {
      //   notificationRef.classList.add("hide");
      //   notificationRef.classList.remove("show");
      // }, 3000);
      // formRef.reset();
    } else {
      let error = await response.json();
      console.log("API ITEM ERROR", error);
      notificationRef.classList.remove("hide");
      notificationRef.classList.add("show");
      headingRef.innerHTML = error.error;

      setTimeout(() => {
        notificationRef.classList.add("hide");
        notificationRef.classList.remove("show");
      }, 3000);
    }
  } else {
    notificationRef.classList.remove("hide");
    notificationRef.classList.add("show");
    heading.innerHTML = "file type either be png || jpeg || jpg !!";

    setTimeout(() => {
      notificationRef.classList.add("hide");
      notificationRef.classList.remove("show");
    }, 3000);
  }
};

// on reload page
async function showList(list) {
  list.forEach((element) => {
    addOption(element.name, brandRef);
    // console.log(element);
    if (element.quantity.length == 0) {
    } else {
      element.quantity = JSON.parse(element.quantity);
    }
  });

  // populating category type
  list.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      removeAllOptions(categoryRef);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        addOption(key, categoryRef);
      });
    }
  });

  // populating quantity
  list.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          removeAllOptions(quantityRef);
          element.quantity[key].forEach((_element) => {
            console.log("element is ", _element);
            addOption(_element.size, quantityRef);
          });
        }
      });
    }
  });
}
showList(data);

// on change brand function
const onChangeBrand = (event) => {
  data.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      removeAllOptions(categoryRef);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        addOption(key, categoryRef);
      });
    }
  });

  // populating quantity
  data.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          removeAllOptions(quantityRef);
          element.quantity[key].forEach((_element) => {
            console.log("element is ", _element);
            addOption(_element.size, quantityRef);
          });
        }
      });
    }
  });
};

const onChangeCategory = (event) => {
  // populating quantity
  data.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          removeAllOptions(quantityRef);
          element.quantity[key].forEach((_element) => {
            console.log("element is ", _element);
            addOption(_element.size, quantityRef);
          });
        }
      });
    }
  });
};
