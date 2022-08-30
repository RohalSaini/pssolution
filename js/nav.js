// Menu Toogle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector("header");
let main = document.querySelector('main');

const signOut = document.getElementById("signOut")

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


// for options 
let ManageRef = document.querySelector(".manage");
let ManageOptionRef = document.querySelector(".manage-show");
let rotateRef = document.querySelector(".rotate");

ManageRef.onclick = () => {
    console.dir(ManageOptionRef);
    ManageOptionRef.classList.toggle("showToggle");
    rotateRef.classList.toggle("rotate");
}


// for options 
let EditRef = document.querySelector(".edit");
let ManageOptionEditRef = document.querySelector(".manage-edit");
let EditrotateRef = document.querySelector(".edit-rotate");

EditRef.onclick = () => {
    ManageOptionEditRef.classList.toggle("showToggle");
    EditrotateRef.classList.toggle("rotate");
}


signOut.onclick = () => {
    localStorage.setItem("token",null);
    localStorage.setItem("email",null);
    localStorage.setItem("status",null);
    location.href="/login"
}