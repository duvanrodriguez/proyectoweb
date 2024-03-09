const characterDetailsContainer = document.getElementById("characterDetailsContainer");

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");

if (characterId) {
    // Llama a la función para obtener los detalles del personaje por su ID
    getCharacterDetails(characterId);
} else {
    // Maneja el caso en que no se proporciona un ID válido
    characterDetailsContainer.innerHTML = "<p>No se ha proporcionado un ID de personaje válido.</p>";
}

// Función para obtener los detalles del personaje por su ID
function getCharacterDetails(id) {
    // Construye la URL de la API para obtener detalles del personaje
    const apiUrl = `https://rickandmortyapi.com/api/character/${id}`;

    // Realiza una solicitud (fetch) a la API para obtener los detalles del personaje
    fetch(apiUrl)
        .then((response) => {
            // Verifica si la respuesta de la red es exitosa
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Convierte la respuesta a formato JSON
            return response.json();
        })
        .then((character) => {
            // Llama a la función para mostrar los detalles del personaje
            displayCharacterDetails(character);
        })
        .catch((error) => {
            // Maneja errores en la operación fetch
            console.error("Hubo un problema con la operación fetch:", error);
            // Muestra un mensaje de error en el contenedor de detalles del personaje
            characterDetailsContainer.innerHTML = "<p>Error al obtener detalles del personaje.</p>";
        });
}

// Función para mostrar los detalles del personaje en la página
function displayCharacterDetails(character) {
    // Crea elementos HTML para mostrar los detalles del personaje

    // Nombre del personaje
    const characterNameElement = document.createElement("h2");
    characterNameElement.textContent = character.name;

    // Imagen del personaje
    const characterImageElement = document.createElement("img");
    characterImageElement.src = character.image;
    characterImageElement.alt = character.name;

    // Especie del personaje
    const characterSpeciesElement = document.createElement("p");
    characterSpeciesElement.textContent = `Especie: ${character.species}`;

    // Estado del personaje
    const characterStatusElement = document.createElement("p");
    characterStatusElement.textContent = `Estado: ${character.status}`;

    // Origen del personaje
    const characterOriginElement = document.createElement("p");
    characterOriginElement.textContent = `Origen: ${character.origin.name}`;

    // Ubicación actual del personaje
    const characterLocationElement = document.createElement("p");
    characterLocationElement.textContent = `Ubicación: ${character.location.name}`;

    // Contenedor para mostrar las apariciones por capítulo
    const characterEpisodesElement = document.createElement("div");
    characterEpisodesElement.innerHTML = "<h3>Apariciones por Capítulo:</h3>";

    // Recorre cada URL de episodio del personaje
    character.episode.forEach((episodeUrl) => {
        // Realiza una solicitud (fetch) a la API para obtener detalles del episodio
        fetch(episodeUrl)
            .then((response) => {
                // Verifica si la respuesta de la red es exitosa
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // Convierte la respuesta a formato JSON
                return response.json();
            })
            .then((episode) => {
                // Crea un elemento para mostrar la aparición del personaje en el episodio
                const episodeElement = document.createElement("p");
                episodeElement.textContent = `${episode.episode} - ${episode.name}`;
                // Agrega el elemento al contenedor de apariciones por capítulo
                characterEpisodesElement.appendChild(episodeElement);
            })
            .catch((error) => {
                // Maneja errores en la operación fetch de episodios
                console.error("Hubo un problema con la operación fetch:", error);
            });
    });

    // Agrega todos los elementos al contenedor de detalles del personaje
    characterDetailsContainer.appendChild(characterNameElement);
    characterDetailsContainer.appendChild(characterImageElement);
    characterDetailsContainer.appendChild(characterSpeciesElement);
    characterDetailsContainer.appendChild(characterStatusElement);
    characterDetailsContainer.appendChild(characterOriginElement);
    characterDetailsContainer.appendChild(characterLocationElement);
    characterDetailsContainer.appendChild(characterEpisodesElement);
}
