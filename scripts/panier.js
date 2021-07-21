let cart = document.querySelector(".cart-card__recap");
let copyOfLS = JSON.parse(localStorage.getItem("products"));
console.log(copyOfLS);
main();


function main() {
  displayCart();
  countTotalInCart();
  toEmptyCart();
  checkFormAndPostRequest();
}

function displayCart() {
  let cleanCart = document.querySelector(".width-to-empty-cart");
  let cartCard = document.querySelector(".cart-card");
  let emptyCart = document.querySelector(".if-empty-cart");

// Si le tableau copié du LS contient au moins un objet, on affiche le panier et on supprime le message d'erreur.
  if (localStorage.getItem("products")) {
    cartCard.style.display = "block";
    emptyCart.style.display = "none";
  }

  for (produit in copyOfLS) {
    displayProduct(produit);
  }

  function displayProduct() {
    document.getElementById("test").innerHTML +=
    `<div class="cart-card__recap__row product-row">
    <div class="cart-card__recap__title">${copyOfLS[produit].name}</div>
    <div class="cart-card__recap__title title-quantity">${copyOfLS[produit].quantity}</div>
    <div class="cart-card__recap__title data-price price">${(copyOfLS[produit].price)*(copyOfLS[produit].quantity)} €</div>
  </div>`

  }
}

function countTotalInCart() {
  let arrayOfPrice = [];
  let totalPrice = document.querySelector(".total");

// On push chaque prix du DOM dans un tableau
  let productPriceAccordingToQuantity = document.querySelectorAll(".price");
  for (let price in productPriceAccordingToQuantity) {
    arrayOfPrice.push(productPriceAccordingToQuantity[price].innerHTML);
  }

// On enlève les undefined du tableau
arrayOfPrice = arrayOfPrice.filter((cleanCart) => {
  return cleanCart != undefined;
});

// Transformer en nombre chaque valeur du tableau
  arrayOfPrice = arrayOfPrice.map((x) => parseFloat(x));

// Additionner les valeurs du tableau pour avoir le prix total
  const reducer = (acc, currentVal) => acc + currentVal;
  arrayOfPrice = arrayOfPrice.reduce(reducer);

// Affichage du prix avec formatage €
  totalPrice.innerText = `Total : ${arrayOfPrice} €`;
}

function toEmptyCart() {

// Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
  const buttonToEmptyCart = document.querySelector(".to-empty-cart");
  buttonToEmptyCart.addEventListener("click", () => {
    localStorage.clear();
  });
}

function checkFormAndPostRequest() {

// On récupère les inputs depuis le DOM.
  const submit = document.querySelector("#submit");
  let inputName = document.querySelector("#name");
  let inputLastName = document.querySelector("#lastname");
  let inputPostal = document.querySelector("#postal");
  let inputCity = document.querySelector("#city");
  let inputAdress = document.querySelector("#adress");
  let inputMail = document.querySelector("#mail");
  let erreur = document.querySelector(".erreur");

// Si un des champs n'est pas remplis lors du clic : message d'erreur + refus d'envoi du formulaire
  submit.addEventListener("click", (e) => {
    if (
      !inputName.value ||
      !inputLastName.value ||
      !inputPostal.value ||
      !inputCity.value ||
      !inputAdress.value ||
      !inputMail.value 
    ) {
      erreur.innerHTML = "Un ou plusieurs champs ne sont pas valides !";
      e.preventDefault();
    }  else {

// Si formulaire valide, le [] productsBought les objets qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
      let productsBought = [];
      productsBought.push(copyOfLS);

      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          city: inputCity.value,
          address: inputAdress.value,
          email: inputMail.value,
        },
        products: productsBought,
      };

/* -------  Envoi de la requête POST au back-end -------- */

      // Création de l'entête de la requête
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      };

      // Préparation du prix formaté pour l'afficher sur la prochaine page
      let priceConfirmation = document.querySelector(".total").innerText;
      priceConfirmation = priceConfirmation.split(" :");

      // Envoie de la requête avec l'en-tête. Chargement de la page avec uniquement l'orderId et le prix dans le LS
   
      fetch("http://localhost:3000/api/teddies/order", options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          localStorage.clear();
          localStorage.setItem("orderId", response.orderId);
          localStorage.setItem("total", priceConfirmation[1]);
          
          /* document.location.href = "confirmation.html"; */ 
          
        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
    }
  
  });
}
