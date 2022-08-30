const tableBodyRef = document.getElementById("table");

const onView = (item) => {
  console.log(item);
  localStorage.setItem(
    "item",
    JSON.stringify({
      ...item,
    })
  );
  location.href = "/viewproduct";
}
const insertRow = (item) => {
  console.log(item);
  let rowCount = table.rows.length;
  var row = tableBodyRef.insertRow(rowCount);

  var cell1 = row.insertCell(0);
  var name = document.createElement("input");
  name.type = "text";
  name.name = "name";
  name.value = item.name;
  cell1.innerHTML = `${item.name}`;

  var cell2 = row.insertCell(1);
  var category = document.createElement("input");
  category.type = "text";
  category.name = "catogory";
  category.value = item.category;
  cell2.innerHTML = `${item.category}`;

  var cell3 = row.insertCell(2);
  var brand = document.createElement("input");
  brand.type = "text";
  brand.name = "brand";
  brand.value = item.brand;
  cell3.innerHTML = `${item.brand}`;

  var cell4 = row.insertCell(3);
  var size = document.createElement("input");
  size.type = "text";
  size.name = "quantity";
  size.value = item.quantity;
  cell4.innerHTML = `${item.quantity}`;

  var cell5 = row.insertCell(4);
  var price = document.createElement("input");
  price.type = "text";
  price.name = "price";
  price.value = item.price;
  cell5.innerHTML = `${item.price}`;

  var cell6 = row.insertCell(5);
  var ourPrice = document.createElement("input");
  ourPrice.type = "text";
  ourPrice.name = "ourPrice";
  ourPrice.value = item.ourPrice;
  cell6.innerHTML = `${item.ourPrice}`;

  var cell7 = row.insertCell(6);
  var discount = document.createElement("input");
  discount.type = "text";
  discount.name = "discount";
  discount.value = item.discount;
  cell7.innerHTML = `${item.discount}`;

  var cell8 = row.insertCell(7);
  var stock = document.createElement("input");
  stock.type = "text";
  stock.name = "stock";
  stock.value = item.stock;
  cell8.innerHTML = `${item.stock}`;

  var cell9 = row.insertCell(8);
  var view = document.createElement("input");
  view.type = "button";
  view.value = "Preview Product";

  cell9.appendChild(view);
  cell9.addEventListener("click", (e) => {
    localStorage.setItem("action", "view");
    onView(item);
  });
};

const show = () => {
  dataObj.brands.forEach((element) => {
    element.quantity = JSON.parse(element.quantity);
    Object.keys(element.quantity).forEach((key) => {
      //console.log(" element ",element.quantity[key]," key is ",key) // baz
      element.quantity[key].forEach((_element) => {
        //console.log(_element);
        if (_element.list) {
          // console.log(_element);
          _element.list.forEach((__element) => {
            // console.log(__element);
            dataObj.products.forEach((___element) => {
              if(___element.id == __element.productId) {
                insertRow({
                  ...___element,
                  ...__element
                })
              }
            })
          })
        }
      });
    });
  });
};

const authenticate = () => {
  try {
    if(!localStorage.getItem("status")) {
      localStorage.setItem("token",null);
      localStorage.setItem("email",null);
      localStorage.setItem("email",null);
      location.href="/login"
    }
  }catch(error) {
    location.href="/login"
  }
}

authenticate();
show();

