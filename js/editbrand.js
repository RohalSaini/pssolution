const brandRef = document.getElementById("brandId");
const stockRef = document.getElementById("stockId");
const categoryRef = document.getElementById("category");

const notificationRef = document.getElementById("notification");
const heading = document.getElementById("msg");
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

const onSaveBrand = async (event) => {
  event.preventDefault();
  // variables declaration

  // console.log(event.target);
  const brand = {
    brand: event.target[0].value,
    stock: event.target[3].value.split(","),
    category: event.target[1].value,
    quantity: null,
  };
  // checking for is exit size
  var isExist = false;
  data.forEach((element) => {
    //console.log(element);
    if (element.name == brandRef.value) {
      Object.keys(element.quantity).forEach((key) => {
        if (key == categoryRef.value) {
          console.log("before same ", element.quantity[key]);
          element.quantity[key].forEach((_element) => {
            console.log(_element.size);
            brand.stock.forEach((__element) => {
              console.log("inner ", __element);
              if (__element == _element.size) {
                isExist = true;
              }
            });
          });
        }
      });
    }
  });

  if (isExist) {
    notificationRef.classList.remove("hide");
    notificationRef.classList.add("show");
    heading.innerHTML =
      "Brand quantity is entered before enter new another one!!";

    setTimeout(() => {
      notificationRef.classList.add("hide");
      notificationRef.classList.remove("show");
    }, 3000);
  } else {
    console.log(brand);
    var status = false;
    var quantity = null;
    data.forEach((element) => {
      //console.log(element);
      if (element.name == brandRef.value) {
        Object.keys(element.quantity).forEach((key) => {
          if (key == categoryRef.value) {
            // console.log(
            //   " element ",
            //   element.quantity[key],
            //   " key is ",
            //   key,
            //   " cate ",
            //   categoryRef.value
            // ); // baz
            console.log("match");
            status = true;
            console.log("before same ", element.quantity[key]);
            brand.stock.forEach((_element) => {
              element.quantity[key].push({
                size: _element.trim(),
                list: null,
              });
            });
            console.log("last same ", element.quantity[key]);
          }
          // console.log(
          //   " after element ",
          //   element.quantity[key],
          //   " key is ",
          //   key,
          //   " cate ",
          //   categoryRef.value
          // ); // baz
          //console.log(html);
          //console.dir(stockRef);
        });
        if (status == false) {
          console.log(" not match");
          console.log("last diff ");
          element.quantity[`${categoryRef.value}`] = [];
          brand.stock.forEach((_element) => {
            element.quantity[`${categoryRef.value}`].push({
              size: _element.trim(),
              list: null,
            });
          });
          console.log("differ ", element.quantity[`${categoryRef.value}`]);
        }
        //console.log(" value is ",html)
        //console.log(element.quantity);
        brand.quantity = JSON.stringify(element.quantity);
        console.log(" at last ", element.quantity);
      }
    });

    let response = await fetch("v1/editbrand", {
      method: "POST",
      body: JSON.stringify(brand),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      let json = await response.json();
      console.log("API Brand Successfully");
      // notificationRef.classList.remove("hide");
      // notificationRef.classList.add("show");

      // heading.innerHTML =
      //   "Brand has been updated succesfully to the database !!";
      // setTimeout(() => {
      //   notificationRef.classList.add("hide");
      //   notificationRef.classList.remove("show");
      // }, 3000);
      // formRef.reset();
      // location.href = "/editbrand";
      if (json.status == true) {
        notificationRef.classList.remove("hide");
        notificationRef.classList.add("show");

        heading.innerHTML =
          "Brand has been updated succesfully to the database !!";
        setTimeout(() => {
          notificationRef.classList.add("hide");
          notificationRef.classList.remove("show");
        }, 3000);
        formRef.reset();
        location.href = "/editbrand";
      } else {
        notificationRef.classList.remove("hide");
        notificationRef.classList.add("show");
        heading.innerHTML = json.error;

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
      heading.innerHTML = error.error;

      setTimeout(() => {
        notificationRef.classList.add("hide");
        notificationRef.classList.remove("show");
      }, 3000);
    }
  }
};

const showList = () => {
  //console.log(data);
  data.forEach((element) => {
    //console.log(element);
    addOption(element.name, brandRef);
    if (element.quantity.length == 0) {
    } else {
      element.quantity = JSON.parse(element.quantity);
    }
  });

  data.forEach((element) => {
    //console.log(element);
    if (element.name == brandRef.value) {
      var html = "";
      Object.keys(element.quantity).forEach((key) => {
        if (key == categoryRef.value) {
          console.log(
            " element ",
            element.quantity[key],
            " key is ",
            key,
            " cate ",
            categoryRef.value
          ); // baz
          element.quantity[key].forEach((_element) => {
            html += ` ${_element.size} \n`;
          });
        }
        console.log(html);
        //console.dir(stockRef);
      });
      //console.log(" value is ",html);
      stockRef.readOnly = false;
      stockRef.value = html;
      stockRef.readOnly = true;
    }
  });
};

const onChangeCategory = () => {
  console.log(" On Change Category ", categoryRef.value);
  stockRef.value = "";
  data.forEach((element) => {
    //console.log(element);
    if (element.name == brandRef.value) {
      var html = "";
      Object.keys(element.quantity).forEach((key) => {
        console.log(" element ", element.quantity[key], " key is ", key); // baz
        if (key == categoryRef.value) {
          element.quantity[key].forEach((_element) => {
            html += ` ${_element.size} \n`;
          });
        }
        //console.log(html);
        //console.dir(stockRef);
      });
      //console.log(" value is ",html);
      stockRef.readOnly = false;
      stockRef.value = html;
      stockRef.readOnly = true;
    }
  });
};
const onChangeBrand = () => {
  //console.log(" On Change Category ",categoryRef.value);
  stockRef.value = "";
  data.forEach((element) => {
    //console.log(element);
    if (element.name == brandRef.value) {
      var html = "";
      Object.keys(element.quantity).forEach((key) => {
        //console.log(" element ",element.quantity[key]," key is ",key) // baz
        if (key == categoryRef.value) {
          element.quantity[key].forEach((_element) => {
            html += ` ${_element.size} \n`;
          });
        }
        //console.log(html);
        //console.dir(stockRef);
      });
      //console.log(" value is ",html);
      stockRef.readOnly = false;
      stockRef.value = html;
      stockRef.readOnly = true;
    }
  });
};
showList();
