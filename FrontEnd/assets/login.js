 //Authentification de l'utilisateur (page login)//

let response;
document.querySelector(".login-form").addEventListener('submit', async (event) => {
  event.preventDefault(); //pour empêcher le rechargement de la page
  //on récupére l'email utilisateur
  const email = event.target.querySelector('[name="email"]').value;
  //on récupère le mdp utilisateur
  const password = event.target.querySelector('[name="password"]').value;
//Envoi requête POST à l'API//
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    body: JSON.stringify(
        {email, 
        password}
    ),
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
  });
  const data = await response.json();
  console.log(response);
  // Réponse après identification://
  if (response.ok) {
    // Traitement de la réponse ici
    localStorage.setItem("identifToken", data.token); // stockage token d'authentification
    // console.log({userId: data.userId, token: data.token});
    window.location.href='index.html';
  } else {
    console.error("Error: Not Found", response.status);//affichage message d'erreur
  }
});







//Y a-t-il le token?
const authToken = localStorage.getItem("identifToken");
if (identifToken) {
  //création et affichage de la barre noire et ce qu'elle contient
  
   //remplacer login par logout dans la nav
   
} else {
  //ne pas afficher la barre noire et le reste
}
//Pour se déconnecter//
document.querySelector(".nomdelaclasse").addEventListener('click', (event) => {
  event.preventDefault(); //pas de rechargement de la page
  //on enlève le token
  localStorage.removeItem('identifToken');
  //retour vers page login
  window.location.href="login.html";
});

