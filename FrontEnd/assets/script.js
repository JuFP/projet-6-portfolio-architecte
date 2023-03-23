//récupération dynamique des projets de l'architecte//
fetch('http://localhost:5678/api/works') //envoi requête à l'API//
  .then(reponse => reponse.json())
  .then(travaux => {
    //création du html dynamique de la galerie de projets à l'arrivée sur la page//
    let galerie = document.querySelector(".gallery");
    for (let i = 0; i < travaux.length; i++) {
      const projet = document.createElement("figure"); 
      const photo = document.createElement("img");
      const legende = document.createElement("figcaption"); 
      photo.src = travaux[i].imageUrl; //changement d'image en fonction de l'indice du tableau travaux//
      legende.innerHTML = travaux[i].title;
      projet.appendChild(photo);
      projet.appendChild(legende);
      galerie.appendChild(projet);
    }
    //récupération des catégories existantes//
    const categories = new Set();
    for (let j = 0; j < travaux.length; j++) {
      if (!categories.has(travaux[j].category.name)) {
        categories.add("Tous");
        categories.add(travaux[j].category.name);
      }
    }
    // création des boutons de catégorie
    const categoriesTableau = Array.from(categories);
    const categorieSection = document.querySelector(".filters_section");
    for (let k = 0; k < categoriesTableau.length; k++) {
      const categorieBouton = document.createElement("button");
      categorieBouton.textContent = categoriesTableau[k];
      categorieSection.appendChild(categorieBouton);
    }
    //événements au clic sur les boutons//
    const tousLesBoutons = document.querySelectorAll(".filters_section button");
    tousLesBoutons.forEach(bouton => {
      bouton.addEventListener("click", () => {
        //on supprime les projets qui ne sont pas de la bonne catégorie
        galerie.innerHTML = "";
        // on récupère la catégorie qui est cliquée
        const categorie = bouton.textContent;
        //on affiche les projets de la catégorie concernée
        const projetsFiltres = travaux.filter(projet => {
          if (categorie === "Tous") {
            return true;
          } else {
            return projet.category.name === categorie;
          }
        });
        // on recrée dynamiquement les travaux après filtrage
        for (let m = 0; m < projetsFiltres.length; m++) {
          const projet = document.createElement("figure"); 
          const photo = document.createElement("img");
          const legende = document.createElement("figcaption"); 
          photo.src = projetsFiltres[m].imageUrl;
          legende.innerHTML = projetsFiltres[m].title;
          projet.appendChild(photo);
          projet.appendChild(legende);
          galerie.appendChild(projet);
        }
      });
    });
  });
//Lorsqu'il y a connexion: création de cette div:// 
//Y a-t-il le token?
//création et affichage de la barre noire et ce qu'elle contient
const authToken = localStorage.getItem("identifToken");
if(authToken) {
  const body = document.getElementsByTagName("body");
  const div = document.createElement("div");
  div.setAttribute("id", "bandeau-edit");
  const texteEdition = document.createElement('p');
  texteEdition.classList.add("txt-edition");
  texteEdition.textContent = "Mode édition";
  const iconeEdition = document.createElement('i');
  iconeEdition.classList.add("fa-regular","fa-pen-to-square");
  const boutonPubli = document.createElement('button');
  boutonPubli.classList.add("btn-publi");
  boutonPubli.textContent = "Publier les changements";
  div.appendChild(iconeEdition);
  div.appendChild(texteEdition);
  div.appendChild(boutonPubli);
  body[0].prepend(div);
  //changement login en logout
  const texteLogin = document.querySelector(".txt-login");
  texteLogin.innerHTML = "logout"; 
  //suppression affichage boutons de filtre
  const sectionFiltres = document.querySelector(".filters_section");
  sectionFiltres.style.display = 'none';
} else {
  //En dehors du mode admin:
  //suppression affichage crayon+texte pour modifier photo de profil
  const photoProfil = document.querySelector('.modifier-photo');
  photoProfil.style.display = 'none';
  //suppression affichage crayon+texte pour modifier projets
  const modifProjets = document.querySelector('.modifier-projet');
  modifProjets.style.display = 'none';
  //suppression affichage crayon+texte pour modifier intro
  const modifIntro = document.querySelector('.modifier-intro');
  modifIntro.style.display = 'none';
}
  