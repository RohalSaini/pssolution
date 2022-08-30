
const notificationRef = document.getElementById("notification");
const headingRef = document.getElementById("msg");
const formRef = document.getElementById("form");
const tableBodyRef = document.getElementById("table");

const popup = document.getElementById("popup");
const msg = document.getElementById("popup_msg");
const yes = document.getElementById("yes");
const no = document.getElementById("no");

const OnDelete = async (item) => {
  console.log(item);
  if(item.id) {
    let response = await fetch("/v1/deleteProduct", {
      method: "POST",
      body: JSON.stringify({
        ...item
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      let json = await response.json();
      if (json.status == true) {
        console.log(json);
        let rowCount = table.rows.length;
        
        console.log(rowCount);
        for(var i = 0; i < table.rows.length;){   
          tableBodyRef.deleteRow(i);
        }
        
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
  }
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
  view.value = "Delete Product";

  cell9.appendChild(view);
  cell9.addEventListener("click", async (e) => {
    if(item.stock ==0) {
      OnDelete(item);
    }else {
      popup.style.display= "block";
      msg.textContent = "You are going to delete the product but is has stock!!  !"
      console.log(" view clicked")
      no.style.display ="none"
      yes.style.display = "none"

      window.onclick = function(event) {
        if (event.target == popup) {
          popup.style.display = "none"
        }
      }
    }
  });
};

const searchRef = document.getElementById("search");
searchRef.addEventListener("keypress",async (event)  => {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log(event.target.value);
    if(event.target.value) {
      let response = await fetch("/v1/search", {
        method: "POST",
        body: JSON.stringify({
          name:event.target.value
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        let json = await response.json();
        if (json.status == true) {
          console.log(json.data.productList);
          let rowCount = table.rows.length;
          
          console.log(rowCount);
          for(var i = 0; i < table.rows.length;){   
            tableBodyRef.deleteRow(i);
          }

          json.data.productList.forEach((item) => {
            insertRow(item)
          })
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
    }else {
     
      notificationRef.classList.remove("hide");
      notificationRef.classList.add("show");
      headingRef.innerHTML = "Enter name of product";
  
      setTimeout(() => {
        notificationRef.classList.add("hide");
        notificationRef.classList.remove("show");
      }, 3000);
    }
  }
});    