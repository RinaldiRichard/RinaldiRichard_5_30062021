main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  const totalConfirmation = document.querySelector(".total span");
  const orderId = document.querySelector(".orderid span");
  
  totalConfirmation.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");


  console.log(typeof(orderId));
  console.log(orderId.value);

/*   // Réinitialisation du LS
  localStorage.clear();  
 */}