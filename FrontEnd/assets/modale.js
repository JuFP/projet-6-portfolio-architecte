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
    //on désactive la flèche gauche du html
    const flecheGauche = document.querySelector(".fleche-retour");
    flecheGauche.style.display = 'none';
    //on désactive la modale de formulaire
    let zoneFormulaire = document.querySelector(".section-formulaire");
    zoneFormulaire.style.display = 'none';
});

//au clic sur bouton Ajouter, affichage modale d'ajout travaux
const boutonAjouter = document.querySelector(".btn-ajouter");
boutonAjouter.addEventListener ('click', function() {
  //changement du titre de la modale:
  let titreModale = document.querySelector(".titre-modale");
  titreModale.innerHTML = "Ajout photo";
  //on n'affiche plus la galerie:
  let zoneProjets = document.querySelector(".zone-projets");
  zoneProjets.style.display='none';
  //on active l'affichage de la flèche retour
  const flecheGauche = document.querySelector(".fleche-retour");
  flecheGauche.style.display ='block';
  //on active l'affichage du formulaire
  const formulaire = document.querySelector(".section-formulaire");
  formulaire.style.display='block';
});
// au clic sur flèche retour, réactivation de la première modale
const flecheGauche = document.querySelector(".fleche-retour");
flecheGauche.addEventListener ('click', function() {
  let zoneProjets = document.querySelector(".zone-projets");
  zoneProjets.style.display = 'block';
  flecheGauche.style.display = 'none'; //désactivation affichage flèche gauche
});   

//fonction d'ajout de projet
const ajouterPhoto = function() {
  fetch('http://localhost:5678/api/works', { //envoi requête à l'API
    method: 'POST',
    body: JSON.stringify(travail),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(travailAjoute => {    
  })
};
//exécution de la fonction d'ajout au clic sur le bouton
const btnValider = document.querySelector(".btn-valider");
btnValider.addEventListener("click", ajouterPhoto);





// const file = document.querySelector("#file");
// const title = document.querySelector("#titre");
// const category = document.querySelector("#categorie");
// file.addEventListener("change", function() {
//   const maFile = this.files[0];
//   const monTitle = title.value;
//   const maCategory = category.value;
//   const form = new FormData() 
//   console.log("jai choisi une image");
// })

