main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  const totalConfirmation = document.querySelector(".total span");
  const orderId = document.querySelector(".orderid span");
  
  totalConfirmation.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");

  console.log(localStorage);
  
   // RĂ©initialisation du LS
  localStorage.clear();  
 }