main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  const totalConfirmation = document.querySelector(".total .display-price");  
  totalConfirmation.innerText = localStorage.getItem("total");

  // Réinitialisation du LS
  localStorage.clear(); 
}