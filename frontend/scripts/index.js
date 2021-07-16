// Lancement automatique de la fonction au chargement de la page
main();

// Initialisation de la fonction main pour récupérer et afficher les articles
async function main() {
  const articles = await getArticles();

//Vérification que le return du fetch a bien été récupérer
  console.log(articles);

// Boucle pour afficher les infos
  for(article of articles) {
    displayArticle(article)
  }
};
// initialition de la fonction de récupération des articles
function getArticles() {

// Return de la promesse pour afficher les infos avec la function displayArticles 
return fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
      return response.json();
    })
    .then(function(articles){
      return articles;
    })
    // affichage d'une fenêtre d'erreur si serveur down ou fetch nok
    .catch((error) => {
      alert("Connexion au serveur impossible. Merci de vérifier l'état du serveur.")
    })
}
// Affichage des infos avec création + remplissage dynamique des éléments
function displayArticle(article) {
  document.getElementById("bearsGrid").innerHTML +=
  `<div class="produit">
  <a href="produit.html?id=${article._id}">
    <div class="divImageproduit">
      <img class=img src="${article.imageUrl}" alt="">
    </div>
    <div class="infosProduit">
      <div class="titreProduit">${article.name}</div>
      <div class="prixProduit">${(article.price/100).toFixed(2)}€</div>
    </div>
  </a>
</div>`
}





















/* main();

function main() {
  getArticles();
} 

const liste = document.getElementsByClassName(".bearsList")

function getArticles() {
  fetch("http://localhost:3000/api/teddies")
    .then (response => response.json())
    .catch((error) => {
      alert("Nous n'arrivons pas à joindre le serveur, merci de recharger la page.")
    })
    .then( function (resultatAPI) {
      const articles = resultatAPI;
      console.log(articles);
      for (let article in articles) {
        
        
        document.querySelector(".bearsGrid").appendChild(carteProduit);
        carteProduit.classList.add("produit")

        let carteProduit = document.createElement("div");
        let lienProduit = document.createElement("a");
        let divImageProduit = document.createElement("div");
        let imageProduit = document.createElement("img");
        let divInfosProduit = document.createElement("div");
        let nomProduit = document.createElement("div");
        let infoPrixProduit = document.createElement("div");


        carteProduit.appendChild(lienProduit);
        lienProduit.href = `produit.html?id=${resultatAPI[article]._id}` // A completer avec l'id pour cibler l'élement
 
        
        lienProduit.appendChild(divImageProduit);
        divImageProduit.classList.add("carteProduit");

        
        divImageProduit.appendChild(imageProduit);
        imageProduit.src = resultatAPI[article].imageUrl;

       
        lienProduit.appendChild(divInfosProduit);
        divInfosProduit.classList.add("infosProduit");

        divInfosProduit.appendChild(nomProduit);
        nomProduit.classList.add("titreProduit");
        nomProduit.innerHTML = resultatAPI[article].name;

        divInfosProduit.appendChild(infoPrixProduit);
        infoPrixProduit.classList.add("prixProduit"); 

        resultatAPI[article].price = resultatAPI[article].price / 100;
        infoPrixProduit.innerHTML = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(resultatAPI[article].price);
    
      }

    })
} 

         



 */