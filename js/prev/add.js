async function onSave(event) {
    event.preventDefault();
    const notificationRef = document.getElementById('notification');
    const headingRef = document.getElementById('msg');

    const serialNumber = document.getElementById('serialNumber').value
    const price = document.getElementById('price').value
    const description = document.getElementById('description').value
    const imageUrl = document.getElementById('imageUrl').value
    const total = document.getElementById('total').value
    const type = document.getElementById('type').value
    const name = document.getElementById('name').value
    const item = {
       serialNumber,
       price,
       description,
       imageUrl,
       total,
       type,
       name 
    }
    let response = await fetch('/admin/add', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    })
    if(response.ok) { 
        let json = await response.json();
        console.log("API Login Successfully")
        notificationRef.classList.remove('hide');
        notificationRef.classList.add("show");
       
        headingRef.innerHTML = "Item has been added succesfully!!";
        setTimeout(() => {
            notificationRef.classList.add("hide");
            notificationRef.classList.remove('show')
        },3000)
        document.getElementById("form").reset();
    } else {
        let error = await response.json();
        console.log("API ITEM ERROR => ADD",error.error)
        notificationRef.classList.remove('hide');
        notificationRef.classList.add("show");
    
        headingRef.innerHTML = error.error;

       setTimeout(() => {
             notificationRef.classList.add("hide");
             notificationRef.classList.remove('show')
         },3000)
    }
}