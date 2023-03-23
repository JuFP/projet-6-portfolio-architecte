localStorage.removeItem('identifToken');
 //Authentification de l'utilisateur (page login)//
let response;
document.querySelector(".login-form").addEventListener('submit', async (event) => {
  event.preventDefault(); //pour empêcher le rechargement de la page
  //on récupére l'email utilisateur
  const email = event.target.querySelector('[name="email"]').value;
  //on récupère le mdp utilisateur
  const password = event.target.querySelector('[name="password"]').value;
//Envoi requête POST à l'API//s
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    body: JSON.stringify(
        {email, 
        password}
    ),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  console.log(data);
  // Réponse après identification://
  if (response.ok) {
    localStorage.setItem("identifToken", data.token); // stockage token d'authentification
    window.location.href='index.html';// si ok, redirection.
  } else {
    //si échec, affichage message d'erreur
    const messErreur = document.querySelector(".erreur-login");
    messErreur.textContent = "échec de l'authentification";
    messErreur.display = 'block';
  }
});