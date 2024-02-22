document.addEventListener("DOMContentLoaded", async (event) => {
    let urlWorks = "http://localhost:5678/api/works";
    let urlCategories = "http://localhost:5678/api/categories";
    let allimages;
    let modal = null;

    async function getCategories() {
        try {
            const response = await fetch(urlCategories);

            if (!response.ok) {
                throw new Error('Erreur de requête ' + response.status);
            }

            const gallery = document.querySelector('.gallery');
            const categoriesJson = await response.json();
            gallery.innerHTML = ''; // Efface la galerie existante

            console.log(categoriesJson);

            const filtres = document.querySelector('.categories');

            categoriesJson.forEach(category => {
                let unFiltre = document.createElement('a');
                unFiltre.classList.add('btn-filtre');
                unFiltre.innerText = category.name;
                unFiltre.addEventListener('click', () => filterImagesByCategory(category.id));
                filtres.appendChild(unFiltre);
            });

            const tousBtn = document.getElementById('Tousbtn');
            console.log(tousBtn);
            tousBtn.addEventListener('click', () => {
                console.log('Bouton Tous cliqué');
                imgfiltre();
            });

        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    }

    async function getImages() {
        try {
            const images = await fetch(urlWorks);
            const imagesJson = await images.json();

            console.log(imagesJson);

            const gallery = document.querySelector('.gallery');
            allimages = imagesJson;
            imgfiltre(); // Appel de la fonction pour afficher toutes les images
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des images :', error);
        }
    }

    async function imgfiltre() {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';

        allimages.forEach(uneImage => {
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
    }

    async function filterImagesByCategory(categoryId) {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = ''; // Efface la galerie existante

        const filteredimages = allimages.filter(image => image.categoryId == categoryId);

        filteredimages.forEach(uneImage => {
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
    }

    const openmodal = function (e, type = "photos") {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));

        // Gérer le fait de récupérer le bon contenu du modal
        if (type == "photos") {
            getImagesmodal(target);
        }

        target.style.display = 'flex';
        target.style.position = 'fixed';
        target.setAttribute('aria-modal', 'true');
        modal = target;
        modal.addEventListener('click', closemodal);

    };

    const closemodal = function (e) {
        e.preventDefault();
        if (modal) {
            modal.style.display = 'none';
            modal.removeAttribute('aria-modal');
            modal.removeEventListener('click', closemodal);
            modal = null;
        }
    };

    document.querySelectorAll('.js-modal').forEach(a => {
        a.addEventListener('click', function (e) {
            console.log('Clic sur un élément .js-modal');
            openmodal(e);
        });
    });

    async function getImagesmodal(target) {
        try {
            const imagesResponse = await fetch(urlWorks);
            const imagesJson = await imagesResponse.json();

            const modalContent = target.querySelector('.modal-img');
            modalContent.innerHTML = ''; // Efface le contenu existant du modal

            imagesJson.forEach(image => {

                const imgElement = document.createElement('img');
                imgElement.src = image.imageUrl;
                imgElement.alt = image.title;
                modalContent.appendChild(imgElement);
            });
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des images pour la modale :', error);
        }
    }


});

/* Fonction à appeler s =i ya un token*/