async function onSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const user = {
        password:password,
        email: email
    }
    console.log("User is ",user);
    fetch('/admin/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
    .then(data => {
        console.log("RESPONSE DATA IS ",data);
        console.log("API Login Successfully")
        localStorage.setItem('email',email)
        console.log("Token is ",data.data.token)
        localStorage.setItem("token",data.data.token);
        location.href = "/admin/addItem";
    })
    .catch(error => {
             console.log(error);
             const notificationRef = document.getElementById('notification')
             console.log(notificationRef);
             notificationRef.classList.remove('hide');
            notificationRef.classList.add("show");
             const heading = document.getElementById('msg');
            //const paragraph = document.getElementById('error-paragraph');
             heading.innerHTML = error.error;
            // paragraph.innerHTML =" Error While Receiving"
            setTimeout(() => {
                  notificationRef.classList.add("hide");
                  notificationRef.classList.remove('show')
              },3000)
    })  
}


function onClose() {
    console.log("clicked");
}