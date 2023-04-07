//PARAMETRAGE MODALE//
let modale = null; //pour savoir quelle modale est ouverte
const ouvrirModale = function (e) {
  e.stopPropagation();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = null;
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
  modale = target;
  modale.addEventListener('click', fermerModale);
  modale.querySelector(".fa-xmark").addEventListener('click', fermerModale);
  modale.querySelector(".stop-modale").addEventListener('click', stopPropagation);
  //fond grisé à l'ouverture de la modale
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  //scroll désactivé à l'ouverture de la modale
  document.body.style.overflow = 'hidden';
  document.body.addEventListener('click', function(e) {
    console.log("je clique");
    fermerModale(e);
  });
};
const fermerModale = function (e) {
  if (modale === null) return; //si modale non existante, arrêt de la fonction
  e.preventDefault();
  modale.style.display = "none";
  modale.setAttribute('aria-hidden', 'true');
  modale.removeAttribute('aria-modal');
  modale.removeEventListener('click', fermerModale);
  modale.querySelector(".fa-xmark").removeEventListener('click', fermerModale);
  modale.querySelector(".stop-modale").removeEventListener('click', stopPropagation);
  modale = null;
  //on enlève le fond grisé à la fermeture de la modale
  document.body.style.backgroundColor = "initial";
  //scroll rétabli à la fermeture de la modale
  document.body.style.overflow = 'auto';
};
const stopPropagation = function (e) {
  e.stopPropagation();  
}
//à chaque clic sur le lien modifier-projet, ouverture modale
document.querySelectorAll('.modifier-projet__texte').forEach(a => {
  a.addEventListener('click', ouvrirModale);  
});
//fermer la modale avec la touche Echap//
window.addEventListener('keydown', function (e) { //evenement d'une touche enfoncée
    if (e.key === "Escape" || e.key === "Esc") { //vérification de la condition
        fermerModale(e); //application de la fonction de fermeture
    }
});
//récupération des projets dans la modale//
fetch('http://localhost:5678/api/works') //envoi requête à l'API//
  .then(reponse => reponse.json())
  .then(travaux => {
    //création du html dynamique de la fenêtre modale//
    let photosModale = document.querySelector(".section-projets");
    //on rend invisible la flèche gauche du html
    const flecheGauche = document.querySelector(".fa-solid.fa-arrow-left-long");
    flecheGauche.style.visibility = 'hidden';
    //on désactive le formulaire modale
    let zoneFormulaire = document.querySelector(".section-formulaire");
    zoneFormulaire.style.display = 'none';
    for (let i = 0; i < travaux.length; i++) {
      const projet = document.createElement("figure"); 
      const photo = document.createElement("img");
      const poubelle = document.createElement("i");
      poubelle.classList.add("fa-solid", "fa-trash-can"); 
      photo.src = travaux[i].imageUrl; //changement d'image en fonction de l'indice du tableau travaux//
      projet.appendChild(photo);
      photosModale.appendChild(projet);
      //ajout icone flèches sur la première photo
      const fleches = document.createElement("i");
      fleches.classList.add("fa-solid", "fa-arrows-up-down-left-right");
      if (i === 0) {
        projet.appendChild(fleches);
        poubelle.style.marginRight = "26px"; //réglage positionnement poubelle première photo
      }
      projet.appendChild(poubelle);
      //consolelog au clic sur chaque poubelle
      poubelle.addEventListener('click', function() {
        console.log("je clique sur poubelle!");

      });
    }
});
//création dynamique du bouton//
let boutonAjouter = document.createElement("input");
boutonAjouter.setAttribute("type", "submit");
boutonAjouter.setAttribute("value", "Ajouter une photo");
document.querySelector(".fenetre-modale").appendChild(boutonAjouter);
//ajout texte "supprimer la galerie"//
let suppGalerie = document.createElement('p');
suppGalerie.classList.add("supp-galerie");
suppGalerie.textContent = "Supprimer la galerie";
document.querySelector(".fenetre-modale").appendChild(suppGalerie);

//au clic sur bouton Ajouter, supprimer certains visuels
//changement dynamique du contenu de la modale
boutonAjouter.addEventListener ('click', function() {
  //on rend visible la flèche gauche
  const flecheGauche = document.querySelector(".fa-solid.fa-arrow-left-long");
  flecheGauche.style.visibility = 'visible';
  let photosModale = document.querySelector(".section-projets");
  photosModale.style.display = 'none';
  let titreModale = document.querySelector(".titre-modale");
  titreModale.innerHTML = "Ajout photo";
  boutonAjouter.setAttribute("value", "Valider");
  boutonAjouter.style.backgroundColor = "#A7A7A7";
  suppGalerie.style.display = 'none';
  //création dynamique du formulaire d'ajout de travaux
  let zoneFormulaire = document.querySelector(".section-formulaire");
  //on réactive l'affichage de la zone de formulaire
  zoneFormulaire.style.display = 'block';
  let formAjoutPhoto = document.createElement("form");
  formAjoutPhoto.action = "#"; //pour définir l'attribut action et method du form
  formAjoutPhoto.method = "post";
  //création des champs de formulaire
  let rubriqueTitre = document.createElement("label");
  rubriqueTitre.setAttribute("for", "name");
  rubriqueTitre.innerHTML = "Titre";
  let champTitre = document.createElement("input");
  champTitre.setAttribute("type", "text");
  champTitre.setAttribute("name", "name");
  champTitre.setAttribute("id", "name");
  let rubriqueSelect = document.createElement("label");
  rubriqueSelect.setAttribute("for", "name");
  rubriqueSelect.innerHTML = "Catégorie";
  let champSelect = document.createElement("select");
  champSelect.setAttribute("name", "select");
  champSelect.setAttribute("id", "select");
  zoneFormulaire.appendChild(formAjoutPhoto);
  formAjoutPhoto.appendChild(rubriqueTitre);
  formAjoutPhoto.appendChild(champTitre);
  formAjoutPhoto.appendChild(rubriqueSelect);
  formAjoutPhoto.appendChild(champSelect);
});

