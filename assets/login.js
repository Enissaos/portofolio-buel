

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await login(); // Appel de la fonction de connexion
});

// Fonction asynchrone pour gérer la connexion
const login = async () => {
    try {
        // Récupération des informations du formulaire
        const userInfo = {
            email: inputMail.value,
            password: inputPassword.value
        };
    }
}
const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
});