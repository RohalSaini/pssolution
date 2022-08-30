const brandRef = document.getElementById("brands");
const categoryRef = document.getElementById("category");
const quantityRef = document.getElementById("quantity");
const productIdRef = document.getElementById("productId");
const productNameRef = document.getElementById("productName");
const priceRef = document.getElementById("price");
const ourPriceRef = document.getElementById("ourPrice");
const discountRef = document.getElementById("discount");

const notificationRef = document.getElementById("notification");
const headingRef = document.getElementById("msg");
const formRef = document.getElementById("form");
var id = null;
var selectedId = null;

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
    event.target[7].files[0] == undefined ||
    event.target[7].files[0].type == "image/png" ||
    event.target[7].files[0].type == "image/jpg" ||
    event.target[7].files[0].type == "image/jpeg"
  ) {
    //console.log(" corrent image type");
    //console.log("++++++++++++++++++++++++++++++++++++");
    //console.log(" File Name is ", event.target[1].files[0].name);
    //console.log(" File Type is ", event.target[1].files[0].type);
    //console.log(" File Size is ", event.target[1].files[0].size);
    //console.log("+++++++++++++++++++++++++++++++++++++");

    const product = {
      name: event.target[3].value,
      price: +event.target[4].value,
      discount: +event.target[5].value,
      ourprice: +event.target[6].value,
      photo: event.target[7].value,
    };
    data.brands.forEach((element) => {
      if (element.name == brandRef.value) {
        //console.log(element);
        Object.keys(element.quantity).forEach((key) => {
          //console.log(" element ",element.quantity[key]," key is ",key) // baz
          if (key == categoryRef.value) {
            element.quantity[key].forEach((_element) => {
              //console.log(_element);
              if (_element.size == quantityRef.value) {
                //console.log(_element);
                //addOption(_element.size,quantityRef);
                data.products.forEach((__element) => {
                  if (__element.name == productNameRef.value) {
                    console.log(__element);
                    id = __element.id;
                  }
                });
              }
            });
          }
        });
      }
    });
    product.id = id;
    console.table(product);
    console.log(event.target);
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("productId", product.productId);
    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("ourPrice", product.ourprice);
    formData.append("image", event.target[7].files[0]);
    let response = await fetch("/v1/editproduct", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      let json = await response.json();
      console.log("API Login Successfully");
      if (json.status == true) {
        notificationRef.classList.remove("hide");
        notificationRef.classList.add("show");

        headingRef.innerHTML =
          "Product has been updated succesfully to the database !!";
        setTimeout(() => {
          notificationRef.classList.add("hide");
          notificationRef.classList.remove("show");
        }, 3000);
        formRef.reset();
        location.href = "/editproduct";
      } else {
        notificationRef.classList.remove("hide");
        notificationRef.classList.add("show");
        headingRef.innerHTML = json.error;

        setTimeout(() => {
          notificationRef.classList.add("hide");
          notificationRef.classList.remove("show");
        }, 3000);
      }
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
    //console.log(element);
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

  // populating quantity and adding name
  list.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          removeAllOptions(quantityRef);
          removeAllOptions(productNameRef);
          //removeAllOptions(productNameRef);
          element.quantity[key].forEach((_element) => {
            //console.log(_element);
            if (_element.list) {
              addOption(_element.size, quantityRef);
              if (quantityRef.value == _element.size.trim()) {
                console.log(
                  "size is ",
                  _element,
                  " list ",
                  _element.size,
                  "quantity ",
                  quantityRef.value
                );
                _element.list.forEach((__element) => {
                  console.log(__element.productId);
                  selectedId = __element.productId;
                  data.products.forEach((___element) => {
                    if (___element.id == selectedId) {
                      addOption(___element.name, productNameRef);
                    }
                  });
                });
              }
            }
            // if(_element.productId) {
            //   console.log(_element);
            //   addOption(_element.size,quantityRef);
            //   // adding values in rest labels
            //   data.products.forEach((__element) => {
            //     if(__element.id == _element.productId) {
            //       console.log(__element);
            //       id = __element.id;
            //       productIdRef.value = __element.productId;
            //       nameRef.value = __element.name;
            //       priceRef.value = __element.price;
            //       ourPriceRef.value = __element.ourPrice;
            //       discountRef.value = __element.discount;
            //     }
            //   })
            // }
          });
        }
      });
    }
  });

  // setting price, ourPrice and discount and image
  data.products.forEach((__element) => {
    if (__element.name == productNameRef.value) {
      console.log(__element);
      //productIdRef.value = __element.productId;
      //nameRef.value = __element.name;
      priceRef.value = __element.price;
      ourPriceRef.value = __element.ourPrice;
      discountRef.value = __element.discount;
    }
  });
}
showList(data.brands);

// on change brand function
const onChangeBrand = (event) => {
  console.log("on change brand");
  var onChangeCategoryStatus = true;
  var onChangeCategoryId = null;
  removeAllOptions(categoryRef);
  removeAllOptions(quantityRef);
  removeAllOptions(productNameRef);
  //productIdRef.value = "";
  productNameRef.value = "";
  priceRef.value = "";
  ourPriceRef.value = "";
  discountRef.value = "";

  // populating category type
  data.brands.forEach((element) => {
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
  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          removeAllOptions(quantityRef);
          element.quantity[key].forEach((_element) => {
            //console.log(_element);
            if (_element.productId) {
              //console.log(_element);
              addOption(_element.size, quantityRef);
              // adding values in rest labels
              data.products.forEach((__element) => {
                if (__element.id == _element.productId) {
                  //console.log(__element);
                  //productIdRef.value = __element.productId;
                  nameRef.value = __element.name;
                  priceRef.value = __element.price;
                  ourPriceRef.value = __element.ourPrice;
                  discountRef.value = __element.discount;
                }
              });
            }
          });
        }
      });
    }
  });

  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          //console.log(_element);
          //removeAllOptions(quantityRef);
          element.quantity[key].forEach((_element) => {
            //console.log(" before found", _element);
            if (_element.list) {
              //console.log(" found", _element);
              addOption(_element.size, quantityRef);
              _element.list.forEach((__element) => {
                //console.log(" every tag ", __element);
                // resetting price, discount , ourPrice value
                //stockRef.value = __element.stock;
                console.log(" list is ", _element);
                if (_element.size.trim() == quantityRef.value.trim()) {
                  data.products.forEach((___element) => {
                    if (___element.id == __element.productId) {
                      if (onChangeCategoryStatus) {
                        //console.log("staus ", __element.productId);
                        onChangeCategoryId = __element.productId;
                        onChangeCategoryStatus = false;
                      }
                      addOption(___element.name, productNameRef);
                    }
                  });
                }
              });
              // stockRef.value = _element.stock;
              // dataObj.products.forEach((__element) => {
              //   if(__element.id == _element.productId) {
              //     console.log(__element);
              //   }
              // })
            }
          });
        }
      });
    }
  });

  // populating price ,ourPrice,dsicount vlaue
  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          element.quantity[key].forEach((_element) => {
            //console.log(_element);
            if (_element.size.trim() == quantityRef.value) {
              //console.log(_element);
              //addOption(_element.size,quantityRef);
              data.products.forEach((__element) => {
                if (__element.name == productNameRef.value) {
                  //console.log(__element);
                  productNameRef.value = __element.name;
                  //console.log(__element.name);
                  // stockRef.value = _element.stock;
                  priceRef.value = __element.price;
                  ourPriceRef.value = __element.ourPrice;
                  discountRef.value = __element.discount;
                  //productIdRef.value = __element.productId;
                }
              });
            }
          });
        }
      });
    }
  });
  // resetting stock value
  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          //console.log(_element);
          element.quantity[key].forEach((_element) => {
            if (_element.list) {
              //console.log(" before found", _element);
              _element.list.forEach((__element) => {
                console.log(
                  " element ",
                  " id is ",
                  onChangeCategoryId,
                  "  ",
                  __element
                );
                if (__element.productId == onChangeCategoryId) {
                  //console.log(" found ",__element);
                  //stockRef.value = __element.stock;
                }
              });
            }
          });
        }
      });
    }
  });
};

const onChangeQuantity = async (event) => {
  //event.preventDefault();
  console.log("on Change Quantity");
  removeAllOptions(productNameRef);
  // populating quantity
  var onChangeQuantityId = null;
  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        element.quantity[key].forEach((_element) => {
          //console.log(_element);
          if (_element.list && _element.size.trim() == quantityRef.value) {
            //console.log("list is ",_element);
            //addOption(_element.size, quantityRef);
            //stockRef.value = _element.stock;
            _element.list.forEach((__element) => {
              //console.log(" single ", __element);
              data.products.forEach((___element) => {
                if (___element.id == __element.productId) {
                  //console.log(" single obj ",___element);
                  addOption(___element.name, productNameRef);
                }
              });
            });
          }
        });
      });
    }
  });

  var productId = null;
  // populating stock
  data.products.forEach((__element) => {
    console.log(__element);
    if (__element.name == productNameRef.value) {
      console.log(__element);
      productNameRef.value = __element.name;
      console.log(__element.name);
      productId = __element.id;
      priceRef.value = __element.price;
      ourPriceRef.value = __element.ourPrice;
      discountRef.value = __element.discount;
    }
  });
};

const onChangeCategory = async (event) => {
  var onChangeCategoryStatus = true;
  var onChangeCategoryId = null;
  //event.preventDefault();
  console.log("on Change Category");
  // populating quantity
  //resettig values
  removeAllOptions(quantityRef);
  removeAllOptions(productNameRef);
  priceRef.value = "";
  discountRef.value = "";
  ourPriceRef.value = "";
  //stockRef.value = "";

  removeAllOptions(quantityRef);
  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          //console.log(_element);
          //removeAllOptions(quantityRef);
          element.quantity[key].forEach((_element) => {
            //console.log(" before found", _element);
            if (_element.list) {
              //console.log(" found", _element);
              addOption(_element.size, quantityRef);
              if (_element.size.trim() == quantityRef.value) {
                _element.list.forEach((__element) => {
                  //console.log(" every tag ", __element);
                  // resetting price, discount , ourPrice value
                  //stockRef.value = __element.stock;
                  data.products.forEach((___element) => {
                    if (___element.id == __element.productId) {
                      console.log(__element);
                      if (onChangeCategoryStatus) {
                        console.log("staus ", __element.productId);
                        onChangeCategoryId = __element.productId;
                        onChangeCategoryStatus = false;
                      }
                      addOption(___element.name, productNameRef);
                    }
                  });
                });
              }
              // stockRef.value = _element.stock;
              // dataObj.products.forEach((__element) => {
              //   if(__element.id == _element.productId) {
              //     console.log(__element);
              //   }
              // })
            }
          });
        }
      });
    }
  });

  // populating price ,ourPrice,dsicount vlaue
  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          element.quantity[key].forEach((_element) => {
            //console.log(_element);
            if (_element.size.trim() == quantityRef.value) {
              //console.log(_element);
              //addOption(_element.size,quantityRef);
              data.products.forEach((__element) => {
                if (__element.name == productNameRef.value) {
                  //console.log(__element);
                  productNameRef.value = __element.name;
                  //console.log(__element.name);
                  //stockRef.value = _element.stock;
                  //productIdRef.value = __element.productId;
                  priceRef.value = __element.price;
                  ourPriceRef.value = __element.ourPrice;
                  discountRef.value = __element.discount;
                }
              });
            }
          });
        }
      });
    }
  });
  // resetting stock value
  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          //console.log(_element);
          element.quantity[key].forEach((_element) => {
            if (_element.list) {
              //console.log(" before found", _element);
              _element.list.forEach((__element) => {
                console.log(
                  " element ",
                  " id is ",
                  onChangeCategoryId,
                  "  ",
                  __element
                );
                if (__element.productId == onChangeCategoryId) {
                  //console.log(" found ",__element);
                  //stockRef.value = __element.stock;
                }
              });
            }
          });
        }
      });
    }
  });
};

const onChangeProductName = (event) => {
  const productName = productNameRef.value;
  console.log("on change product Name", productName);

  // resetting price, discount , ourPrice value
  data.products.forEach((__element) => {
    if (__element.name == productNameRef.value) {
      //console.log(__element);
      id = __element.id;
      productNameRef.value = __element.name;
      //console.log(__element.name);
      priceRef.value = __element.price;
      //productIdRef.value = __element.productId;
      ourPriceRef.value = __element.ourPrice;
      discountRef.value = __element.discount;
    }
  });

  // resetting stock value
  data.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          //console.log(_element);
          element.quantity[key].forEach((_element) => {
            if (_element.list) {
              //console.log(" before found", _element);
              _element.list.forEach((__element) => {
                //console.log(" element "," id is ",id,"  ",__element);
                if (__element.productId == id) {
                  //console.log(" found ",__element);
                  //stockRef.value = __element.stock;
                }
              });
            }
          });
        }
      });
    }
  });
};
