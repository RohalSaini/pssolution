

// async function intializeID() {
//     console.log("Clicked on Image TAG");
//     document.getElementById(`image`).onclick = async function () {
//         console.log("Clicked on Image TAG");
//         const reader = new FileReader();
//         const readedResult = reader.result
//         reader.readAsDataURL(this.readedResult[0]);
//     }
// }

//intializeID();
async function onSave(event) {
    event.preventDefault();
    //console.log(event.target[4].files[0].type);
    //console.log(event.target[4].files[0].name);
    const notificationRef = document.getElementById('notification');
    const heading = document.getElementById('msg');

    const name = document.getElementById('name').value
    const type = document.getElementById('type').value
    const serialNumber = document.getElementById('serialNumber').value
    const measurement = document.getElementById('measurement').value
    console.log("type ",type);

    const item = {
       type,
       name,
       serialNumber,
       measurement
    }
     const formData = new FormData();
    formData.append("type",type);
    formData.append("name",name);
    formData.append("serialNumber",serialNumber);
    formData.append("measurement",measurement)
    formData.append("image",event.target[4].files[0])
    let response = await fetch('/admin/addProductList/', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': '*/*',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    })
    

    if(response.ok) { 
        let json = await response.json();
        console.log("API Login Successfully")
        notificationRef.classList.remove('hide');
        notificationRef.classList.add("show");
       
        heading.innerHTML = "Item has been added succesfully!!";
        setTimeout(() => {
            notificationRef.classList.add("hide");
            notificationRef.classList.remove('show')
        },3000)
        document.getElementById("form").reset();
    } else {
        let error = await response.json();
        console.log("API ITEM ERROR",error)
        notificationRef.classList.remove('hide');
        notificationRef.classList.add("show");
        heading.innerHTML = error.error;
        // move to local Storage
        if(error.error == "Access Denied! Unauthorized User") {
            localStorage.removeItem("token");
            location.href = "/";
        }
       setTimeout(() => {
             notificationRef.classList.add("hide");
             notificationRef.classList.remove('show')
         },3000)
    }
}