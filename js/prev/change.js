async function showList(list) {
    const x = document.getElementById("names");
    const image = document.getElementById("oldimage");
    list.forEach(element => {
        var option = document.createElement("option");
        option.text = element.name;
        x.add(option);
        
        console.log("element image is ",element.image);
        console.log(element.id)
        console.log(element.name)
        
    });
    if(list.length>0) {
        image.src=`/images/${list[0].image}`;
    }
}
showList(data);

async function onSave(event) {
    event.preventDefault();
    console.log(event.target[1].files[0]);
    const name = document.getElementById('names').value
    const image = document.getElementById('oldimage')
    let id

    data.forEach(element => {
        if(element.name == name) {
            image.src=`/images/${element.image}`;
            id = element.id;
        }
    });
    const formData = new FormData();
    formData.append("id",id);
    formData.append("image",event.target[1].files[0])

   
    let response = await fetch('/upload',{
         method: 'POST',
         body: formData,
         headers: {
            'Accept': '*/*',
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

function onChange() {
    const x = document.getElementById("names").value
    const image = document.getElementById("oldimage");
    console.log("Value is ",x);
    data.forEach(element => {
        if(element.name == x) {
            image.src=`/images/${element.image}`;
        }
    });
    
}