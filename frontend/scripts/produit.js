// Déclaration de la variable id pour l'utiliser dans le fetch

let params = new URL(document.location).searchParams;
let id = params.get("id");


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

        let colorSelect = document.getElementById("color-select");
          for (let i = 0; i < article.colors.length; i++) {
            let option = document.createElement("option");
            option.innerText = article.colors[i];
            colorSelect.appendChild(option);
      }
    })    
}





