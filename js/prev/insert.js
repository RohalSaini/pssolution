async function showList(list) {
    const x = document.getElementById("names");
    list.forEach(element => {
        var option = document.createElement("option");
        option.text = element.name;
        x.add(option);
        console.log(element.id)
        console.log(element.name)
    });
}
showList(data);

async function onSave(event) {
    event.preventDefault();
    const price = document.getElementById('price').value
    const discount = document.getElementById('discount').value
    const total = document.getElementById('total').value
    const name = document.getElementById('names').value
    const weight = document.getElementById('weight').value
    let itemId;
    data.forEach(element => {
        if(element.name == name)
            itemId = element.id;
    });
    const rating =2
    
    const item = {
        price,
        discount,
        quantity:total,
        name,
        size:weight,
        itemId,
        rating
     }
    let response = await fetch('/admin/add',{
         method: 'POST',
         body: JSON.stringify(item),
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+localStorage.getItem('token')
         }
     })
     const notificationRef = document.getElementById('notification');
     const heading = document.getElementById('msg');

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
         heading.innerHTML = "Error while inserting !!";

        setTimeout(() => {
              notificationRef.classList.add("hide");
              notificationRef.classList.remove('show')
          },3000)
    }
}