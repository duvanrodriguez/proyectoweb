const apiUrl = "https://rickandmortyapi.com/api/character";

// Llama a la función para obtener los personajes al cargar la página
getFilesFromApi();

// Función para obtener los personajes desde el API
function getFilesFromApi() {
    // Realiza una solicitud a la API para obtener datos sobre los personajes
    fetch(apiUrl)
        .then((response) => {
            // Verifica si la respuesta de la red es exitosa
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Convierte la respuesta a formato JSON
            return response.json();
        })
        .then((data) => {
            // Llama a la función para crear las tarjetas de personajes con episodios
            createCharacterCards(data.results);
        })
        .catch((error) => {
            // Maneja errores en la operación fetch
            console.error("Hubo un problema con la operación fetch:", error);
        });
}

// Función para crear las tarjetas de personajes con episodios
function createCharacterCards(characters) {
    // Obtiene el contenedor de personajes en el HTML
    const charactersContainer = document.getElementById("charactersContainer");
    // Limpia el contenido anterior del contenedor
    charactersContainer.innerHTML = "";

    // Itera sobre la lista de personajes y crea tarjetas para cada uno
    characters.forEach((character) => {
        // Crea un elemento de tarjeta (div)
        const card = document.createElement("div");
        // Agrega la clase para el estilo de la tarjeta
        card.classList.add("character-card");

        // Crea un elemento de imagen
        const imageElement = document.createElement("img");
        // Establece la fuente (URL de la imagen) de la etiqueta de imagen
        imageElement.src = character.image;
        // Establece el atributo 'alt' de la etiqueta de imagen con el nombre del personaje
        imageElement.alt = character.name;

        // Crea un elemento de párrafo para mostrar el nombre del personaje
        const nameElement = document.createElement("p");
        nameElement.textContent = character.name;

        // Crea un elemento de párrafo para mostrar el número de episodios
        const episodesElement = document.createElement("p");
        episodesElement.textContent = `Episodios: ${character.episode.length}`;

        // Agrega la etiqueta de imagen como un hijo del elemento de tarjeta
        card.appendChild(imageElement);
        // Agrega el elemento de párrafo del nombre al elemento de tarjeta
        card.appendChild(nameElement);
        // Agrega el elemento de párrafo de episodios al elemento de tarjeta
        card.appendChild(episodesElement);
        // Agrega la tarjeta al contenedor de personajes

        charactersContainer.appendChild(card);

        // Agrega un evento de clic a cada tarjeta para redirigir a la página de detalles
        card.addEventListener("click", () => {
            // Crea una URL con el ID del personaje y redirige a la página de detalles
            const characterDetailsUrl = `details.html?id=${character.id}`;
            window.location.href = characterDetailsUrl;
        });
    });
}
