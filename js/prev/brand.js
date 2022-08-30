const onSaveBrand = async (event) => {
  event.preventDefault();

  // variables declaration
  const notificationRef = document.getElementById("notification");
  const heading = document.getElementById("msg");
  const formRef = document.getElementById("form");

  if (
    event.target[1].files[0].type == "image/png" ||
    event.target[1].files[0].type == "image/jpg" ||
    event.target[1].files[0].type == "image/jpeg"
  ) {
    //console.log(" corrent image type");
    //console.log("++++++++++++++++++++++++++++++++++++");
    //console.log(" File Name is ", event.target[1].files[0].name);
    //console.log(" File Type is ", event.target[1].files[0].type);
    //console.log(" File Size is ", event.target[1].files[0].size);
    //console.log("+++++++++++++++++++++++++++++++++++++");

    const brand = {
      name: event.target[0].value,
      photo: event.target[1].value,
    };
    console.table(brand);

    const formData = new FormData();
    formData.append("name", brand.name);
    formData.append("image", event.target[1].files[0]);
    console.log(" name ", brand.name);
    let response = await fetch("/v1/brand", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
      },
    });

    if (response.ok) {
      let json = await response.json();
      console.log("API Login Successfully");
      notificationRef.classList.remove("hide");
      notificationRef.classList.add("show");

      heading.innerHTML = "Brand has been added succesfully to the database !!";
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
  } else {
    notificationRef.classList.remove("hide");
    notificationRef.classList.add("show");
    heading.innerHTML = "file type either be png || jpeg || jpg !!";

    setTimeout(() => {
      notificationRef.classList.add("hide");
      notificationRef.classList.remove("show");
    }, 3000);
  }
};

