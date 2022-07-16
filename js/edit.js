async function onEdit(item) {
  const notificationRef = document.getElementById("notification");
  const heading = document.getElementById("msg");

  const myArr = JSON.parse(item);
  var td = document.getElementById(`${myArr.stock[0].stockId}`);

  if (td.textContent != "Save") {
    td.parentElement.childNodes[3].childNodes[0].readOnly = false;
    td.parentElement.childNodes[3].childNodes[0].value = myArr.stock[0].price;
    td.parentElement.childNodes[3].childNodes[0].type = "number";

    td.parentElement.childNodes[4].childNodes[0].readOnly = false;
    td.parentElement.childNodes[4].childNodes[0].type = "number";
    td.parentElement.childNodes[4].childNodes[0].value =
      myArr.stock[0].discount;

    td.parentElement.childNodes[5].childNodes[0].readOnly = false;
    td.parentElement.childNodes[5].childNodes[0].type = "number";
    td.parentElement.childNodes[5].childNodes[0].value = myArr.stock[0].size;

    td.parentElement.childNodes[6].childNodes[0].readOnly = false;
    td.parentElement.childNodes[6].childNodes[0].type = "number";
    td.parentElement.childNodes[6].childNodes[0].value =
      myArr.stock[0].quantity;

    td.parentElement.childNodes[8].childNodes[0].textContent = "Save";
  } else {
    const price = td.parentElement.childNodes[3].childNodes[0].value;

    td.parentElement.childNodes[3].childNodes[0].type = "text";
    td.parentElement.childNodes[3].childNodes[0].value = `Rs ${myArr.stock[0].price}`;
    td.parentElement.childNodes[3].childNodes[0].readOnly = true;

    const discount = td.parentElement.childNodes[4].childNodes[0].value;
    td.parentElement.childNodes[4].childNodes[0].type = "text";
    td.parentElement.childNodes[4].childNodes[0].value = `${myArr.stock[0].discount}%`;
    td.parentElement.childNodes[4].childNodes[0].readOnly = true;

    const size = td.parentElement.childNodes[5].childNodes[0].value;
    td.parentElement.childNodes[5].childNodes[0].type = "text";
    td.parentElement.childNodes[5].childNodes[0].value = `${myArr.stock[0].size} ${myArr.measurement}`;
    td.parentElement.childNodes[5].childNodes[0].readOnly = true;

    const quantity = td.parentElement.childNodes[6].childNodes[0].value;
    td.parentElement.childNodes[6].childNodes[0].type = "text";
    td.parentElement.childNodes[6].childNodes[0].value =
      myArr.stock[0].quantity;
    td.parentElement.childNodes[6].childNodes[0].readOnly = true;

    td.parentElement.childNodes[8].childNodes[0].textContent = "Edit";

    // hitting api
    const item = {
      id: myArr.stock[0].stockId,
      price,
      discount,
      size,
      quantity,
      itemId: myArr.id,
    };
    let response = await fetch("/admin/edit", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      let json = await response.json();
      console.log("API Login Successfully");
      notificationRef.classList.remove("hide");
      notificationRef.classList.add("show");

      heading.innerHTML = "Item has been added succesfully!!";

      setTimeout(() => {
        notificationRef.classList.add("hide");
        notificationRef.classList.remove("show");
      }, 3000);

      window.location.replace("/dashboard");
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
}

async function onDelete(item) {
  const myArr = JSON.parse(item);

  const notificationRef = document.getElementById("notification");
  const heading = document.getElementById("msg");

  let response = await fetch(
    `/admin/productdelete?name=${myArr.stock[0].stockId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  if (response.ok) {
    let json = await response.json();
    console.log("API Login Successfully");
    notificationRef.classList.remove("hide");
    notificationRef.classList.add("show");

    heading.innerHTML = "Item has been deleted succesfully!!";
    setTimeout(() => {
      notificationRef.classList.add("hide");
      notificationRef.classList.remove("show");
    }, 3000);
    window.location.replace("/dashboard");
  } else {
    let error = await response.json();
    console.log("API ITEM ERROR", error);
    notificationRef.classList.remove("hide");
    notificationRef.classList.add("show");

    heading.innerHTML = "Error While Deleting Item Try again later";

    setTimeout(() => {
      notificationRef.classList.add("hide");
      notificationRef.classList.remove("show");
    }, 3000);
  }
}
