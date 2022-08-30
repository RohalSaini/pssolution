async function onShip(item) {
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
