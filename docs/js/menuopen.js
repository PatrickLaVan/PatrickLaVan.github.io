
var menu = document.querySelector(".menu-sm");
var navi = document.querySelector("#nav");

menu.onclick = function() {
    this.classList.toggle("checked");
    navi.classList.toggle("open");		
}
