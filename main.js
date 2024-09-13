/*      ADVERTENCIA AL PROFESOR
Tuve que corregir la cantidad de personajes a mostrar ya que en el anunciado de la prueba de consolidación,
se indica que estás limitado a mostrar 5 personajes por rango, y el rango 2 que está contemplado entre los
numeros 6 y 11 suman un total de 6 personajes. El tercer rango, contempla entre los numeros 12 y 17, sin
embargo, al consumir la API con el numero 17, se obtiene como resultado un Error 404. Considerando lo dicho
anteriormente, decidí ajustar los rangos de tal manera que quedan de la siguiente manera: El primer rango
queda entre los numeros 1 y 5, el segundo rango queda entre los numeros 6 y 10 y el último queda entre los
numeros 12 y 16 para cumplir con lo que se muestra como "resultado final" en la última página del enunciado.
Nótese que se omite el consumo de API del numero 11 (que corresponde al personaje "Anakin Skywalker").
 */

const firstTimeLine = document.getElementById('firstTL')
const secondTimeLine = document.getElementById('secondTL')
const thirdTimeLine = document.getElementById('thirdTL')

let firstRange = 1;  //Debe estar en el rango desde el 1 al 5
let secondRange = 6; //Debe estar en el rango desde el 6 al 10
let thirdRange = 12; //Debe estar en el rango desde el 12 al 16

firstTimeLine.addEventListener('mouseenter', function(){
    if(firstRange >= 1 && firstRange <= 5){
        getCharacterInfo(firstRange);
        firstRange++
    }
    else{
        console.warn('No se cumplen las condiciones para hacer la solicitud')
    }
});

secondTimeLine.addEventListener('mouseenter', function(){
    if(secondRange >= 6 && secondRange <= 10){
        getCharacterInfo(secondRange);
        secondRange++
    }
    else{
        console.warn('No se cumplen las condiciones para hacer la solicitud')
    }
});

thirdTimeLine.addEventListener('mouseenter', function(){
    if(thirdRange >= 12 && thirdRange <= 16){
        getCharacterInfo(thirdRange);
        thirdRange++
    }
    else{
        console.warn('No se cumplen las condiciones para hacer la solicitud')
    }
});

/*      COMENTARIO
Además de hacer la solicitud al BackEnd o API, debemos renderizar su contenido de forma inmediata en el lugar
que corresponde, y se me ocurrió que esa era la mejor forma en vez de agrandar la función que inyecta el código
en el DOM y evitar repetir código. Hágame saber si puedo mejorar algo en el código y así darle una vuelta.
 */
async function getCharacterInfo(id){
    let yellowIcon = '<div class="timeline-icon-yellow"></div>';
    let greenIcon  = '<div class="timeline-icon-green"></div>';
    let blueIcon   = '<div class="timeline-icon-blue"></div>';
    
    try {
        let response = await fetch("https://swapi.dev/api/people/"+id+"/");

        if(!response.ok){
            if(response.status ===404){
                console.error("Personaje no encontrado", response.status);
                throw new Error("Recurso no encontrado");
            }
            else{
                console.error("Error HTTP", response.status);
                throw new Error("Erro al obtener personaje");
            }
        }

        const data = await response.json();
        if(id >= 1 && id <= 5){
            showCharacterInfo(data, firstTimeLine, yellowIcon)
        }
        if(id >= 6 && id <= 10){
            showCharacterInfo(data, secondTimeLine, greenIcon)
        }
        if(id >= 12 && id <= 16){
            showCharacterInfo(data, thirdTimeLine, blueIcon)
        }
    } catch (error) {
        console.log(error);
    }
}

function showCharacterInfo(character, element, iconColor){
    const {name, height, mass} = character;
    console.log(character);

    let htmlcard = `<div class="col-12 col-md-6 col-lg-4">
                        <div class="characterCard single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                            ${iconColor}
                            <div class="timeline-text">
                                <h6>${name}</h6>
                                <p>Estatura: ${height} cm. Peso: ${mass} kg.</p>
                            </div>
                        </div>
                    </div>`

    element.insertAdjacentHTML("afterend", htmlcard)
}