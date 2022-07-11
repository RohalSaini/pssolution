async function showList(list) {
  console.dir(list);
  list.forEach((element) => {
    document.getElementById(`${element.id}`).nextElementSibling.childNodes[0].onclick = async function () {
      // const notificationRef = document.getElementById("notification");
      // const heading = document.getElementById("msg");

      // let response = await fetch(`/admin/itemdelete?name=${element.id}`, {
      //   method: "DELETE",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + localStorage.getItem("token"),
      //   },
      // });

      // if (response.ok) {
      //   let json = await response.json();
      //   console.log("API Login Successfully");
      //   notificationRef.classList.remove("hide");
      //   notificationRef.classList.add("show");

      //   heading.innerHTML = "Item has been delted succesfully!!";
      //   window.location.replace("/viewProduct");
      //   setTimeout(() => {
      //     notificationRef.classList.add("hide");
      //     notificationRef.classList.remove("show");
      //   }, 3000);
      // } else {
      //   let error = await response.json();
      //   console.log("API ITEM ERROR", error);
      //   notificationRef.classList.remove("hide");
      //   notificationRef.classList.add("show");
      //   heading.innerHTML = "Error While Reciving..";
      //   setTimeout(() => {
      //     notificationRef.classList.add("hide");
      //     notificationRef.classList.remove("show");
      //   }, 3000);
      // }
    };

    document.getElementById(`${element.id}`).onclick = async function () {
      var td = document.getElementById(`${element.id}`);
      if (td.textContent != "Save") {
        td.parentElement.childNodes[1].childNodes[0].readOnly = false;
        td.parentElement.childNodes[2].childNodes[0].readOnly = false;
        td.parentElement.childNodes[3].childNodes[0].readOnly = true;
        td.parentElement.childNodes[4].childNodes[0].textContent = "Save";
      } else {
        console.log("Call to Save");
        // save edit api
        console.dir(
          "child Node 1",
          td.parentElement.childNodes[1].childNodes[0].value
        );
        console.dir(
          "child Node 2",
          td.parentElement.childNodes[2].childNodes[0].value
        );
        console.dir(
          "child Node 3",
          td.parentElement.childNodes[3].childNodes[0].value
        );
        const name = td.parentElement.childNodes[1].childNodes[0].value;
        const measurement = td.parentElement.childNodes[2].childNodes[0].value;
        const type = td.parentElement.childNodes[3].childNodes[0].value;
        if (name.length == 0) {
          alert("Enter name field");
          return;
        } else if (measurement.length == 0) {
          alert("Enter unit field");
          return;
        } else if (type.length == 0) {
          alert("Enter type field");
          return;
        } else {
          td.parentElement.childNodes[4].childNodes[0].textContent = "Edit";
          const item = {
            id: element.id,
            serialNumber: element.serialNumber,
            name,
            measurement,
            type,
          };
          console.dir(item);
          td.parentElement.childNodes[1].childNodes[0].readOnly = true;
          td.parentElement.childNodes[2].childNodes[0].readOnly = true;
          td.parentElement.childNodes[3].childNodes[0].readOnly = true;
          console.log("Token is ", localStorage.getItem("token"));
          const notificationRef = document.getElementById("notification");
          const heading = document.getElementById("msg");

          let response = await fetch("/admin/editItem/", {
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

            heading.innerHTML = "Item has been updated succesfully!!";
            setTimeout(() => {
              notificationRef.classList.add("hide");
              notificationRef.classList.remove("show");
            }, 3000);
          } else {
            let error = await response.json();
            console.log("API ITEM ERROR", error);
            notificationRef.classList.remove("hide");
            notificationRef.classList.add("show");
            heading.innerHTML = "Error While Reciving..";
            setTimeout(() => {
              notificationRef.classList.add("hide");
              notificationRef.classList.remove("show");
            }, 3000);
          }
        }
      }
    };
  });
}
showList(data);
document.getElementById("menu_btn").addEventListener("click", function () {
  const menuRef = document.getElementById("menu_btn");
  const isContain = menuRef.classList.contains("active");

  if (!isContain) {
    console.log("It does not contain but it is added now");
    menuRef.classList.add("active");
    var asideRef = document.getElementById("menu_bar");
    asideRef.style.left = 0;
    var content = document.getElementById("interface");
    content.style.marginLeft = 250;
  } else {
    console.log("It contains but now removed");
    menuRef.classList.remove("active");
    var asideRef = document.getElementById("menu_bar");
    asideRef.style.left = -400;
  }
});
