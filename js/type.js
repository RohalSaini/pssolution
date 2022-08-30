const onSaveType = async (event) => {
  event.preventDefault();

  // variables declaration
  const notificationRef = document.getElementById("notification");
  const heading = document.getElementById("msg");
  const formRef = document.getElementById("form");

  const type = {
      type: event.target[0].value
  };
  let response = await fetch("v1/type/add", {
    method: "POST",
    body: JSON.stringify(type),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });
  if (response.ok) {
    let json = await response.json();
    console.log("API Login Successfully");
    notificationRef.classList.remove("hide");
    notificationRef.classList.add("show");

    heading.innerHTML = "Tyoe has been added succesfully to the database !!";
    setTimeout(() => {
      notificationRef.classList.add("hide");
      notificationRef.classList.remove("show");
    }, 3000);
    formRef.reset();
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
