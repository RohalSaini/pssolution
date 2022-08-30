const onSaveBrand = async (event) => {
  event.preventDefault();
  // variables declaration
  const notificationRef = document.getElementById("notification");
  const heading = document.getElementById("msg");
  const formRef = document.getElementById("form");

  console.log(event.target);
  const brand = {
    name: event.target[0].value,
    stock: {
      [event.target[1].value.split(",")]: event.target[2].value.split(",")
    },
    category: event.target[1].value
  };
  console.log(brand.stock[brand.category]);
  let response = await fetch("v1/brand", {
    method: "POST",
    body: JSON.stringify(brand),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+localStorage.getItem('token')
    },
  });
  if (response.ok) {
    let json = await response.json();
    console.log("API Brand Successfully");
    console.log(json);
    if(json.status == true) {
      location.href="/brand";
      formRef.reset();
    } else {
      notificationRef.classList.remove("hide");
      notificationRef.classList.add("show");
      heading.innerHTML = json.error;

      setTimeout(() => {
        notificationRef.classList.add("hide");
        notificationRef.classList.remove("show");
      }, 3000);
    }
    // notificationRef.classList.remove("hide");
    // notificationRef.classList.add("show");

    // heading.innerHTML = "Brand has been added succesfully to the database !!";
    // location.href="/brand";
    
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
    heading.innerHTML = error.error;

    setTimeout(() => {
      notificationRef.classList.add("hide");
      notificationRef.classList.remove("show");
    }, 3000);
  }
};
