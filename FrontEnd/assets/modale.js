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
   //on désactive la flèche gauche
   const flecheGauche = document.querySelector(".fleche-retour");
   flecheGauche.style.display = 'none';
   //on désactive le message de titre vide
   const spanTitre = document.querySelector(".titre-vide");
   spanTitre.style.display = 'none';
   //on désactive la modale de formulaire
   let zoneFormulaire = document.querySelector(".section-formulaire");
   zoneFormulaire.style.display = 'none';
   //on affiche le premier visuel
   let zoneProjets = document.querySelector(".zone-projets");
   zoneProjets.style.display = 'block';
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
      //ciblage de l'id de chaque projet crée
      poubelle.setAttribute("data-id", travaux[i].id);
      // SUPPRESSION D'UN PROJET
      poubelle.addEventListener("click", function(e) {
        e.preventDefault();
        //récupération de l'id
        const id = e.target.dataset.id;
        //exécution de la fonction de suppression de projet
        supprimerPhoto(id);
      });
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
    }
    //on affiche pas la flèche gauche
    const flecheGauche = document.querySelector(".fleche-retour");
    flecheGauche.style.display = 'none';
    //on désactive le visuel de formulaire
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
  //affichage de la flèche retour
  const flecheGauche = document.querySelector(".fleche-retour");
  flecheGauche.style.display ='block';
  //affichage du formulaire
  const formulaire = document.querySelector(".section-formulaire");
  formulaire.style.display='block';
});
// au clic sur flèche retour, réactivation de la première modale
const flecheGauche = document.querySelector(".fleche-retour");
flecheGauche.addEventListener ('click', function() {
  let zoneProjets = document.querySelector(".zone-projets");
  zoneProjets.style.display = 'block';
  flecheGauche.style.display = 'none'; //désactivation affichage flèche gauche
  let zoneFormulaire = document.querySelector(".section-formulaire");
  zoneFormulaire.style.display='none'; //désactivation affichage deuxième visuel
    //on désactive la photo uploadée
  const miniature = document.querySelector(".miniature");
  miniature.style.display = 'none';
      //en réactivant le visuel initial de la zone-upload
  boutonChoix.style.display = 'block';
  illustration.style.display = 'block';
  texteIllus.style.display = 'block';
});   
//affichage dynamique du choix de catégorie
const choix = document.querySelector('#choix-categ');
//récupération des catégories via l'api
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
  //boucle qui recence et insère toutes les catégories
    for (const laCategorie of categories) { 
      const option = document.createElement('option');
      option.value = laCategorie.id;
      option.text = laCategorie.name;
      choix.appendChild(option);
    }
})
//AJOUT D'UN PROJET
const ajouterPhoto = function() {
  const donnees = new FormData();
  const imageChoisie = document.querySelector("#upload");
  const titreCree = document.querySelector("#name");
  const categorieChoisie = document.querySelector("#choix-categ");
  const titreVide = document.querySelector(".titre-vide");
  // imposer le remplissage du champ de titre
  if (titreCree.value === "") {
    titreVide.textContent = "Veuillez indiquer un titre";
    return;
  }
  donnees.append("image", imageChoisie.files[0]);
  donnees.append("title", titreCree.value);
  donnees.append("category", categorieChoisie.value);
  //afficher les données qui seront envoyés à l'api:
  console.log(imageChoisie.files[0], titreCree.value, categorieChoisie.value);
  fetch('http://localhost:5678/api/works', { //envoi requête à l'API
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("identifToken")}`
    },
     body: donnees,
  })
    .then(response => response.json())
    .then(travailAjoute =>console.log(travailAjoute) //pour afficher dans la console la réponse de l'API en JSON
    )
};
//exécution de la fonction d'ajout au clic sur le bouton
const btnValider = document.querySelector(".btn-valider");
btnValider.addEventListener("click", ajouterPhoto);


// //affichage de la zone de l'image à ajouter//
// const boutonChoix = document.getElementById("bouton-choix");
// const imageChargee = document.getElementById("upload");
// const previewImage = document.querySelector(".zone-upload");
// const illustration = document.querySelector(".fa-image");
// const texteIllus = document.querySelector(".texte-illus");
// imageChargee.addEventListener('change', function() {
//   const file = this.files[0];
//   if (!file) return;
//   //si un fichier est choisi, création d'une img en html
//   const img = document.createElement('img');
//   img.classList.add("miniature");
//   img.src = URL.createObjectURL(file);
//   previewImage.appendChild(img);
//   // on désactive l'affichage de certains éléments
//   boutonChoix.style.display = "none";
//   illustration.style.display = "none";
//   texteIllus.style.display = "none";
// });

//affichage de la zone de l'image à ajouter//
const boutonChoix = document.getElementById("bouton-choix");
const imageChargee = document.getElementById("upload");
const previewImage = document.querySelector(".zone-upload");
const illustration = document.querySelector(".fa-image");
const texteIllus = document.querySelector(".texte-illus");
imageChargee.addEventListener('change', function() {
  const file = this.files[0]; //premier élément choisi
  if (!file) return;
  const lectFichier = new FileReader();
  //quand le fichier est lu, création d'une img en html
  lectFichier.onloadend = function() {
    const img = document.createElement('img');
    img.classList.add("miniature");
    img.src = lectFichier.result; //définition de la src de l'image
    previewImage.appendChild(img); //image ajoutée dans la zone-upload
  }
  lectFichier.readAsDataURL(file);//lecture du type de data
  // on désactive l'affichage de certains éléments
  boutonChoix.style.display = "none";
  illustration.style.display = "none";
  texteIllus.style.display = "none";
});
// SUPPRESSION D'UN PROJET
const supprimerPhoto = function(id) {
  fetch(`http://localhost:5678/api/works/${id}`, { //envoi requête à l'API
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("identifToken")}`
    }
  })
  .then(response => response.json())
  .then(travailSupprime => console.log(travailSupprime))
};














