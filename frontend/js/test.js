document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown-onclick");
    const dropdownContent = document.querySelector(".dropown-content");
    const menuOne = document.querySelector(".one");
    const menuItems = document.querySelectorAll(".menu-item");
    const beschreibungItems = document.querySelectorAll(".beschreibung > div");
    const defaultItem = document.querySelector(".beschreibung .default");

    function updateVisibility() {
        if (window.innerWidth > 768) {
            dropdown.style.display = "none";
            menuOne.style.display = "block";
        } else {
            dropdown.style.display = "block";
            menuOne.style.display = "none";
            dropdownContent.style.display = "none";
        }
    }

    window.addEventListener("resize", updateVisibility);
    updateVisibility();

    dropdown.addEventListener("click", function () {
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });

    function showDescription(index) {
        beschreibungItems.forEach(item => item.style.display = "none");
        const selectedItem = document.querySelector(`.beschreibung > div:nth-child(${index + 2})`);
        if (selectedItem) {
            selectedItem.style.display = "block";
        } else {
            defaultItem.style.display = "block";
        }
    }

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            showDescription(index);
            if (window.innerWidth <= 768) {
                dropdownContent.style.display = "none";
            }
        });
    });
});