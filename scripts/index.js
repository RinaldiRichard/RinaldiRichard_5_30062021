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