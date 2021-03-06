let cart = document.querySelector(".cart-card__recap");
let copyOfLS = JSON.parse(localStorage.getItem("products"));
let productsBought= [];

main();


function main() {
  displayCart();
  countTotalInCart();
  toEmptyCart();
  checkFormAndPostRequest();
}

function displayCart() {
  let cartCard = document.querySelector(".cart-card");
  let emptyCart = document.querySelector(".if-empty-cart");
  console.log(copyOfLS);

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

 // ------------------------------------------------------------------------











// Si un des champs n'est pas remplis lors du clic : message d'erreur + refus d'envoi du formulaire
  submit.addEventListener("click", (e) => {

    //Variable pour la vérification du code postal
    let checkNumber = /[0-9]{5}$/;
    let resultNumber = checkNumber.test(inputPostal.value)

    let checkMail = /^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/;
    let resultMail = checkMail.test(inputMail.value)

    console.log(resultNumber);
    if (
      !inputName.value  ||
      !inputLastName.value ||
      !inputCity.value ||
      !inputMail.value 
    ) {
      erreur.innerHTML = "Un ou plusieurs champs ne sont pas valides !";
      e.preventDefault();
      erreur.style.color = "#e71837";
      setTimeout("location.reload(true);", 3000);
    } 
    // Erreur personalisée du code postal
     else if (resultNumber === false) {
      e.preventDefault();
      erreur.innerHTML = "Merci de rentrer un code postal composé de 5 chiffres"      
      erreur.style.color = "#e71837";     
    }
    else if (resultMail === false) {
      erreur.innerHTML = "Merci de renseigner une adresse mail valide !"
      e.preventDefault();
      erreur.style.color = "#e71837";
    }
     else {

// Si formulaire valide, productsBought sera un tableau avec uniquement les id des produits et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
      for (produit in copyOfLS) {

      productsBought.push(copyOfLS[produit]._id);
      
      }
      console.log(copyOfLS[produit]._id);

      
      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          address: inputAdress.value,
          city: inputCity.value,
          email: inputMail.value,
        },
        products: productsBought,
      };      
      
// -------  Envoi de la requête POST au back-end -------- 

      // Création de l'entête de la requête
      const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      };
      console.log(options.body);
      
      // Préparation du prix formaté pour l'afficher sur la prochaine page
      let priceConfirmation = document.querySelector(".total").innerText;
      priceConfirmation = priceConfirmation.split(" :");

      // Envoie de la requête avec l'en-tête. Chargement de la page avec uniquement l'orderId et le prix dans le LS
      fetch("http://localhost:3000/api/teddies/order", options)
        .then((response) => response.json())
        .then((response) => {
          localStorage.clear();
          localStorage.setItem("orderId", response.orderId);
          localStorage.setItem("total", priceConfirmation[1]);
          
        document.location.href = "confirmation.html"; 
          
        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
    }
  
  });
}
