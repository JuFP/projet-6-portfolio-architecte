//récupération dynamique des projets de l'architecte//
async function recProjets() {
    try {
      const reponse = await fetch('http://localhost:5678/api/works'); //envoi requête à l'API//
      const travaux = await reponse.json(); //mise en attente de la réponse//
      console.log(travaux); //affichage de ce qui est récupéré//
  //création du html dynamique de la galerie de projets//
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
    } catch (error) {
      console.error("erreur lors de la récupération", error); //si erreur, affichage d'un message//
    }
}
recProjets();
//création en html dynamique des boutons de filtres//
async function recFiltres() {
  try {
    const affichage = await fetch('http://localhost:5678/api/categories');
    const filtres = await affichage.json();
    console.log(filtres);
    let sectionFiltres = document.querySelector(".filters_section");
    const tous = document.createElement("button");//rajout bouton "Tous"//
    tous.setAttribute("id", "boutonTous"); //attribution d'id au bouton Tous//
    tous.innerHTML = "Tous";
    sectionFiltres.appendChild(tous);
  //création des boutons en html dynamique// 
    filtres.forEach(filtre => {
      const bouton = document.createElement("button"); //création des sélecteurs button//
      bouton.innerHTML = filtre.name; //attribution texte du bouton de chaque filtre//
      sectionFiltres.appendChild(bouton);
      bouton.setAttribute("id", filtre.id); //attribution d'id aux autres boutons//
      // console.log(bouton)
    });      
  } catch (error) {
    console.error("erreur lors de l'affichage", error);
  }
//essais écouteurs d'événements au clic//
  
  const essaiClicObjets = document.getElementById('1');
  essaiClicObjets.addEventListener('click', () => {	
    console.log("clic sur objet"); 
  });
  const essaiClicAppartements = document.getElementById('2');
  essaiClicAppartements.addEventListener('click', () => {	
    console.log("clic sur appartements"); 
  });
  const essaiClicHotels = document.getElementById('3');
  essaiClicHotels.addEventListener('click', () => {	
    console.log("clic sur hôtels"); 
  });
  
  
}
recFiltres();





