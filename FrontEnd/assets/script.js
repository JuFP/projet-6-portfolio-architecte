//récupération dynamique des projets de l'architecte//
let works
fetch('http://localhost:5678/api/works') //envoi requête à l'API//
  .then(reponse => reponse.json())
  .then(travaux => {
    console.log(travaux); //affichage de ce qui est récupéré//
    works = travaux
    //création du html dynamique de la galerie de projets//
    let galerie = document.querySelector(".gallery");


      // const recupNomCategorie = travaux.map(projet => projet.category.name);
      // console.log(recupNomCategorie); 
      // console.log(travaux[2].category.name); //récupération du nom de la category du projet à l'indice2 du tableau travaux//

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
    fetch('http://localhost:5678/api/categories')
    .then(reponse => reponse.json())
    .then(filtres => {
      console.log("filtres", "travaux", filtres, travaux);
      console.log(filtres);
    console.log(works, "works");
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
      //essais écouteurs d'événements au clic//
      const essaiClicTous = document.getElementById('boutonTous');
      essaiClicTous.addEventListener('click', () => {
        console.log("clic sur bouton tous");
      })
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
    })
  })
  })

