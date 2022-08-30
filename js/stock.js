// variables
const categoryRef = document.getElementById("category");
const productNameRef = document.getElementById("productName");
const quantityRef = document.getElementById("quantity");
const priceRef = document.getElementById("price");
const discountRef = document.getElementById("discount");
const ourPriceRef = document.getElementById("ourPrice");
const stockRef = document.getElementById("stock");
const brandRef = document.getElementById("brandId");

const notificationRef = document.getElementById("notification");
const headingRef = document.getElementById("msg");
const formRef = document.getElementById("form");
var id = null;

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

const showList = (data) => {
  // populating brand
  data.brands.forEach((element) => {
    console.log("element is ", element.name);
    addOption(element.name, brandRef);
    if (element.quantity.length == 0) {
    } else {
      element.quantity = JSON.parse(element.quantity);
    }
  });

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
          //console.log(_element);
          removeAllOptions(quantityRef);
          element.quantity[key].forEach((_element) => {
            //console.log("stock ", _element);
            if (_element.list) {
              // console.log(" found", _element);
              addOption(_element.size, quantityRef);
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

  // populating quantity name
  removeAllOptions(productNameRef);
  data.brands.forEach((element) => {
    var status = false;
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          //console.log(_element);
          element.quantity[key].forEach((_element) => {
            //console.log("stock ", _element);
            if (_element.size == quantityRef.value) {
              //console.log(" found", _element);
              _element.list.forEach((__list) => {
                // console.log(__list);
                dataObj.products.forEach((__element) => {
                  console.log(" for each", __element);
                  if (__element.id == __list.productId) {
                    if (status == false) {
                      console.log(__element);
                      stockRef.value = __list.stock;
                      status = true;
                    }
                    addOption(__element.name, productNameRef);
                    //productNameRef.value = __element.name;
                    //console.log(__element.name);
                    //priceRef.value = __element.price;
                    //ourPriceRef.value = __element.ourPrice;
                    //discountRef.value = __element.discount;
                  }
                });
              });
            }
          });
        }
      });
    }
  });

  // populating price , discount ,our price
  dataObj.products.forEach((__element) => {
    if (__element.name == productNameRef.value) {
      //console.log(__element);
      //productNameRef.value = __element.name;
      //console.log(__element.name);
      priceRef.value = __element.price;
      ourPriceRef.value = __element.ourPrice;
      discountRef.value = __element.discount;
      //addOption(__element.name,productNameRef);
    }
  });
  priceRef.readOnly = true;
  discountRef.readOnly = true;
  ourPriceRef.readOnly = true;
  stockRef.readOnly = true;
};

showList(dataObj);

const onAddStock = async (event) => {
  event.preventDefault();
  // variables declaration

  //console.log(event.target);
  const stock = {
    name: event.target[3].value,
    productId: 0,
    size: event.target[2].value,
    brand: event.target[0].value,
    stock: +event.target[7].value,
    category: event.target[1].value,
    add: +event.target[8].value,
  };

  dataObj.products.forEach((item, index) => {
    if ((item.name == stock.name) & (item.quantity == stock.size)) {
      stock.brand = item.brand;
      stock.productId = item.id;
    }
  });

  // populating stock
  dataObj.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        element.quantity[key].forEach((_element) => {
          //console.log(_element);
          if (_element.size == quantityRef.value) {
            //console.log(_element);
            //addOption(_element.size,quantityRef);
            console.log(" value is ", stock.stock + stock.add);
            //stockRef.value = _element.stock;
            //stockRef.value = stock.stock+ stock.add;
            dataObj.products.forEach((__element) => {
              if (__element.id == _element.productId) {
                console.log(__element);
              }
            });
          }
        });
      });
    }
  });
  console.log(stock);
  let response = await fetch("/v1/stock", {
    method: "POST",
    body: JSON.stringify(stock),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (response.ok) {
    let json = await response.json();
    console.log("API Brand Successfully");
    if (json.status == true) {
      notificationRef.classList.remove("hide");
      notificationRef.classList.add("show");

      headingRef.innerHTML =
        "Stock has been updated succesfully to the database !!";
      setTimeout(() => {
        notificationRef.classList.add("hide");
        notificationRef.classList.remove("show");
      }, 3000);
      location.href = "/stock";
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
};

const onChangeBrand = async (event) => {
  console.log(" on chmage brand is called");
  var onChangeCategoryStatus = true;
  var onChangeCategoryId = null;
  // reset all
  productNameRef.value = "";
  priceRef.value = "";
  ourPriceRef.value = "";
  stockRef.value = "";
  discountRef.value = "";
  // event.preventDefault();
  // populating category type
  removeAllOptions(categoryRef);
  removeAllOptions(quantityRef);
  removeAllOptions(productNameRef);
  dataObj.brands.forEach((element) => {
    if (element.name == brandRef.value) {
      //console.log(element);
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        addOption(key, categoryRef);
      });
    }
  });

  // // populating quantity
  // dataObj.brands.forEach((element) => {
  //   if (element.name == brandRef.value) {
  //     //console.log(element);
  //     Object.keys(element.quantity).forEach((key) => {
  //       //console.log(" element ",element.quantity[key]," key is ",key) // baz
  //       //removeAllOptions(quantityRef);
  //       element.quantity[key].forEach((_element) => {
  //         //console.log(_element);
  //         if (_element.list) {
  //           console.log(_element);
  //           addOption(_element.size, quantityRef);
  //           //stockRef.value = _element.stock;
  //         }
  //       });
  //     });
  //   }
  // });

  dataObj.brands.forEach((element) => {
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
              console.log(
                " found",
                _element,
                " size is ",
                quantityRef.value,
                " list size is ",
                _element.size
              );
              addOption(_element.size, quantityRef);
              if (quantityRef.value.trim() == _element.size.trim()) {
                _element.list.forEach((__element) => {
                  //console.log(" every tag ", __element);
                  // resetting price, discount , ourPrice value
                  //stockRef.value = __element.stock;
                  dataObj.products.forEach((___element) => {
                    if (___element.id == __element.productId) {
                      //console.log("list is ",__element);
                      if (onChangeCategoryStatus) {
                        //console.log("staus ", __element.productId, " name is ",___element.name);
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
  dataObj.brands.forEach((element) => {
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
              dataObj.products.forEach((__element) => {
                if (
                  __element.name == productNameRef.value &&
                  quantityRef.value.trim() == __element.quantity.trim()
                ) {
                  //console.log(__element);
                  productNameRef.value = __element.name;
                  //console.log(__element.name);
                  stockRef.value = _element.stock;
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
  dataObj.brands.forEach((element) => {
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
                  stockRef.value = __element.stock;
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
  dataObj.brands.forEach((element) => {
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
              dataObj.products.forEach((___element) => {
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
  dataObj.brands.forEach((element) => {
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
              console.log(" single ", __element);
              productId = __element.productId;
              dataObj.products.forEach((___element) => {
                if (___element.id == __element.productId) {
                  // console.log(" single obj ",__element);
                  //addOption(___element.name,productNameRef);
                  stockRef.value = __element.stock;
                }
              });
            });
          }
        });
      });
    }
  });
  // populating stock
  dataObj.products.forEach((__element) => {
    //console.log(__element);
    if (__element.name == productNameRef.value) {
      //console.log(__element);
      productNameRef.value = __element.name;
      console.log("setting values", __element);
      //productId = __element.id;
      if (__element.id == productId) {
        priceRef.value = __element.price;
        ourPriceRef.value = __element.ourPrice;
        discountRef.value = __element.discount;
      }
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
  stockRef.value = "";

  removeAllOptions(quantityRef);
  dataObj.brands.forEach((element) => {
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
                dataObj.products.forEach((___element) => {
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
  dataObj.brands.forEach((element) => {
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
              dataObj.products.forEach((__element) => {
                if (__element.name == productNameRef.value) {
                  //console.log(__element);
                  productNameRef.value = __element.name;
                  //console.log(__element.name);
                  stockRef.value = _element.stock;
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
  dataObj.brands.forEach((element) => {
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
                  stockRef.value = __element.stock;
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
  dataObj.products.forEach((__element) => {
    if (__element.name == productNameRef.value) {
      //console.log(__element);
      id = __element.id;
      productNameRef.value = __element.name;
      //console.log(__element.name);
      priceRef.value = __element.price;
      ourPriceRef.value = __element.ourPrice;
      discountRef.value = __element.discount;
    }
  });

  // resetting stock value
  dataObj.brands.forEach((element) => {
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
                  stockRef.value = __element.stock;
                }
              });
            }
          });
        }
      });
    }
  });
};
