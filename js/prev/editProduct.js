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
