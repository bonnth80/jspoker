console.log("index.js connected");

var btnMenu = document.getElementById("btnNewGame"),
   fieldGameMenu = document.getElementById("gameMenu");

btnMenu.addEventListener("click", () => {
   console.log("btnMenu clicked");

   if (fieldGameMenu.style.display === "none") {
      fieldGameMenu.style.display = "block";
   } else {
      fieldGameMenu.style.display = "none";
   }
})