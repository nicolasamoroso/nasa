const btnBuscar = document.querySelector("#btnBuscar");
const inputBuscar = document.querySelector("#inputBuscar");
const htmlContentToAppend = document.querySelector("#contenedor");

btnBuscar.onclick = async () => {
    const url = "https://images-api.nasa.gov/search?q=" + inputBuscar.value;
    const getJSONData = await fetch(url)
                                .then((response) => response.json())
                                .catch(function (error) {
                                    console.log(error);
                                });
    console.log(getJSONData);
    showCards(getJSONData);
};

function showCards(data) {
    if (data.collection.items.length > 0) {
        htmlContentToAppend.innerHTML = `
        <div id="container-cards" class="row mt-5 justify-content-center">
            <h1 class="text-center mb-5">Resultados de la búsqueda de ${inputBuscar.value.toLowerCase()}</h1>
        </div>`
        const Cards = document.querySelector('#container-cards');

        data.collection.items.forEach((item) => {
            
            if(item.data[0].media_type !== "audio") {
                
                const {
                    data: [{title, description, date_created}],
                    links : [{href}]
                } = item;
    
                Cards.innerHTML += `
                <div class="col-md-4 scale">
                    <div class="card mb-4 shadow-sm custom-card cursor-active card_hover">
                        <a href="${href}" target="_blank">
                            <img class="bd-placeholder-img card-img-top imgNASA" src="${href}">
                        </a>
                        <div class="box">
                            <h5 class="m-3 mt-0">${title}</h5>
                            <p class="m-3">${description}</p>
                        </div>
                        <small class="m-3 mt-0 text-muted">${date_created}</small>
                    </div>
                </div>
                `
            }
        })
    }
    else {
        htmlContentToAppend.innerHTML =  `
        <div class="col-md-12 text-center">
            <h1 class="text-center mt-5">No se encontraron resultados para la búsqueda de ${inputBuscar.value.toLowerCase()}</h1>
        </div>
        `
    }
}