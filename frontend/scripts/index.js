main();

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
      for (let article in articles) {
        
        let carteProduit = document.createElement("div");
        document.querySelector(".bearsGrid").appendChild(carteProduit);
        carteProduit.classList.add("produit")

        let lienProduit = document.createElement("a");
        carteProduit.appendChild(lienProduit);
        lienProduit.href = `produit.html?id=${resultatAPI[article]._id}` // A completer avec l'id pour cibler l'élement
 
        let divImageProduit = document.createElement("div");
        lienProduit.appendChild(divImageProduit);
        divImageProduit.classList.add("carteProduit");

        let imageProduit = document.createElement("img");
        divImageProduit.appendChild(imageProduit);
        imageProduit.src = resultatAPI[article].imageUrl;

        let divInfosProduit = document.createElement("div");
        lienProduit.appendChild(divInfosProduit);
        divInfosProduit.classList.add("infosProduit");

        let nomProduit = document.createElement("div");
        divInfosProduit.appendChild(nomProduit);
        nomProduit.classList.add("titreProduit");
        nomProduit.innerHTML = resultatAPI[article].name;

        let infoPrixProduit = document.createElement("div");
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

         



