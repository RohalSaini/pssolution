
// Menu Toogle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector("header");
let main = document.querySelector('main');


toggle.onclick = function() {
    console.log("toogle clicked ==> checked");
    navigation.classList.toggle("active");
    main.classList.toggle("active");
}


// add hover effect
let list = document.querySelectorAll('.container header nav aside ul li');
function activeLink(){
    console.log("active Linked is called");
    list.forEach((item) => 
        item.classList.remove('hovered'));
    this.classList.add("hovered");
}

list.forEach((item) => {
    item.addEventListener('mouseover',activeLink)
})


