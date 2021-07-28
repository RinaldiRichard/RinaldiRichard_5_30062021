// Déclaration de la variable id pour l'utiliser dans le fetch

let params = new URL(document.location).searchParams;
let id = params.get("id");
const tabId=[];

// Déclaration des constantes pour l'affichage dans les zones correspondantes

const imgProduit = document.querySelector(".img");
const nomProduit = document.querySelector(".info__produit__titre");
const descriptionProduit = document.querySelector(".info__produit__description");
const prixProduit = document.querySelector(".info__produit__prix");
const bearNumber = document.querySelector("#bearNum");
const colorSelect = document.querySelector("#color-select"); 


// Initialisation de la fonction principale

main();

function main() {
  getArticles();
  addToCart();
}


// Récupération des infos selon l'id de l'élément selectionné précédement

function getArticles() {
    fetch(`http://localhost:3000/api/teddies/${id}`)
      .then (response => response.json())
      
      .catch((error) => {
        alert("Nous n'arrivons pas à joindre le serveur, merci de recharger la page.")
      })
      

// On place les données reçues aux bons endroits 

      .then(function (resultatAPI) {        
        let article = resultatAPI;
        nomProduit.innerHTML = article.name;
        imgProduit.src = article.imageUrl;
        descriptionProduit.innerText = article.description;
        prixProduit.innerText = (article.price/100).toFixed(2) + " €";

        let colorSelect = document.getElementById("color-select");
          for (let i = 0; i < article.colors.length; i++) {
            let option = document.createElement("option");
            option.innerText = article.colors[i];
            colorSelect.appendChild(option);
      }
    })   
    console.log(id); 
}

// ----------------------------------------------------------


function addToCart() {
  const addToCartBtn = document.querySelector(".add-to-cart");
  const ajout = document.querySelector(".added");
  
  addToCartBtn.addEventListener("click", () => {
    
    if (bearNumber.value > 0 ) {

      // Création du produit qui sera ajouté au panier
      let productAdded = {
        name: nomProduit.innerHTML,
        price: parseFloat(prixProduit.innerHTML),
        quantity: parseFloat(document.querySelector("#bearNum").value),
        _id: id,        
      };
      
       () => {
        tabId.push(productAdded.id)
      }

console.log(tabId);

      // Gestion du localStorage
      let arrayProductsInCart = [];
      
      // Si le LS existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
      if (localStorage.getItem("products") ) {
        arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
        
      // Si le LS est vide, on le crée avec le produit ajouté
      } 
        arrayProductsInCart.push(productAdded);
        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      console.log(arrayProductsInCart);
      // Visibilité du texte "produit ajouté"
      ajout.style.opacity = 0.9;
      
  };
  })
}
