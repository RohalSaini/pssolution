const notificationRef = document.getElementById("notification");
const heading = document.getElementById("msg");
const formRef = document.getElementById("form");

const onAuthenticate = async (event) => {
  event.preventDefault();
  const user = {
    email: event.target[0].value + "@phone.com",
    id: event.target[1].value,
  };
  let response = await fetch("/authenticateUser", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    let json = await response.json();
    console.table(json);
    if (json.success) {
        console.log(json.data.token);
        localStorage.setItem("status", true);
        localStorage.setItem("token",json.data.token);
        localStorage.setItem("email",json.data.email);
        location.href="/"
    } else {
      console.log("API error");
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
};


const authenticate = () => {
    console.log(localStorage.getItem("status"));
    try {
      if(localStorage.getItem("status")== true) {
        location.href="/"
      }
    }catch(error) {
      
    }
  }
  
  authenticate();