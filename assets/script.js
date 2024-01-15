

async function getCategories() {
    try {
        // Récupération des catégories depuis le fichier JSON
        const response = await fetch('http://localhost:5678/api/categories');

        // Vérifier si la requête a réussi (statut OK)
        if (!response.ok) {
            throw new Error('Erreur de requête ' + response.status);
        }

        const categoriesJson = await response.json();

        console.log(categoriesJson);

        const filtres = document.querySelector('.categories');


        categoriesJson.forEach(category => {
            let unFiltre = document.createElement('button');
            unFiltre.classList.add('btn');
            unFiltre.innerText = category.name;
            unFiltre.setAttribute('id', category.id)
            filtres.appendChild(unFiltre);

        });
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}


async function getImages() {
    try {
        const images = await fetch('http://localhost:5678/api/works');
        const imagesJson = await images.json();

        console.log(imagesJson);

        const gallery = document.querySelector('.gallery');

        imagesJson.forEach(uneImage => {
            const figure = document.createElement('figure');
            const imageElement = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            imageElement.src = uneImage.imageUrl;
            imageElement.alt = uneImage.title;
            figcaption.innerText = uneImage.title;

            figure.appendChild(imageElement);
            figure.appendChild(figcaption);

            gallery.appendChild(figure);
        });
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des images :', error);
    }
}

// Appeler la fonction pour récupérer les catégories //
getCategories();
getImages();

