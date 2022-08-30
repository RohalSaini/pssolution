const tableBodyRef = document.getElementById("table");
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

const popup = document.getElementById("popup");
const msg = document.getElementById("popup_msg");
const yes = document.getElementById("yes");
const no = document.getElementById("no");


const okModalRef = document.getElementById("okModal");
const okModalOkButtonSubmissionRef = document.getElementById("ok-Modal-ok-Submission");
const orderRef = document.getElementById("order");
const orderType = document.getElementById("orderType");
const nameRef = document.getElementById("name");
const cellRef = document.getElementById("cell");
const customerBill = document.getElementById("customerBill");
const customerAddress = document.getElementById("customerAddress");
const customerStock = document.getElementById("customerStock");

const onView = (item) => {
  console.log(item);
  localStorage.setItem(
    "item",
    JSON.stringify({
      ...item,
    })
  );
  location.href = "/viewOrder";
}

const onConfirm =  async (item,rowCount) => {
  console.log("id is ",item);
  let response = await fetch("/v1/confirmOrder", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
    //formRef.reset();
    location.href ="/order";
    
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
const onCancel =  async (item,rowCount) => {
  console.log("id is ",item);
  let response = await fetch("/v1/cancelOrder", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
    //formRef.reset();
    //tableBodyRef.deleteRow(rowCount);
    location.href ="/order";
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
const insertRow = (item) => {
  console.log(item);
  let rowCount = table.rows.length;
  var row = tableBodyRef.insertRow(rowCount);

  var cell1 = row.insertCell(0);
  var order = document.createElement("input");
  order.type = "text";
  order.name = "order";
  order.value = item.orderNumber;
  cell1.innerHTML = `${item.orderNumber}`;

  var typecell = row.insertCell(1);
  // var type = document.createElement("input");
  // type.type = "text";
  // type.name = "order";
  // type.value = item.orderType;
  typecell.innerHTML = `${item.orderType}`;

  var cell2 = row.insertCell(2);
  var name = document.createElement("input");
  name.type = "button";
  name.name = "name";
  name.value = item.name;
  cell2.innerHTML = `${item.name}`;
  //  cell2.appendChild(name);
  
  var cell3 = row.insertCell(3);
  var bill = document.createElement("input");
  bill.type = "text";
  bill.name = "brand";
  bill.value = item.bill;
  cell3.innerHTML = ` Rs ${item.bill}`;

  var cell4 = row.insertCell(4);
  var cell = document.createElement("input");
  cell.type = "text";
  cell.name = "cell";
  cell.value = item.cell;
  cell4.innerHTML = `${item.cell}`;

  var cell5 = row.insertCell(5);
  var view = document.createElement("input");
  view.type = "button";
  view.value = "View";

  cell5.appendChild(view);
  cell5.addEventListener("click", (e) => {
    console.log(" on click is called")
    console.log(item);
    okModalRef.style.display= "block";
    orderRef.textContent= "";
    cellRef.textContent= "";
    nameRef.textContent = "";
    customerAddress.textContent= "";
    customerBill.textContent = "";
    customerStock.textContent = "";
    orderRef.textContent = "orderId " +item.orderNumber;
    cellRef.textContent = " cell : " +item.cell;
    nameRef.textContent = item.name;
    orderType.textContent = "ordeType : " +item.orderType;
    customerAddress.innerHTML = item.address + "<br>"+" OrderOn : "+item.createdAt;
    customerBill.textContent = "Rs "+item.bill;
    const items = JSON.parse(item.cart);
    //console.log(" cart is ",items);
    items.forEach((element) => {
      customerStock.innerHTML += element.name+ "[id ="+element.id+"] " + "  == Quantity ["+ element.add + "]";
      customerStock.innerHTML +=" <br />";
    })
    
    //customerStock.text = string;
    okModalOkButtonSubmissionRef.onclick = () => {
      okModalRef.style.display = "none"
    }
    window.onclick = (event) => {
      if (event.target == okModalRef) {
        okModalRef.style.display = "none"
      }
    }
  });
};

const show = () => {
  dataObj.orders.reverse();
  dataObj.orders.forEach((element) => {
    //console.log(element);
    insertRow(element)
  })
};

show();
