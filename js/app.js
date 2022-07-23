const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
    
});

function buscarClima(e){
    e.preventDefault(); 
    //Validar 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value; 
    if(ciudad === '' || pais === ''){
        mostrarError('Todos los campos son obligatorios');
        return; 
    }
   
    //Consultar la API
   consultarAPI(ciudad, pais); 
}

function mostrarError(message){
    const alerta = document.querySelector('.bg-red-200'); 
    if(!alerta){
        const alerta = document.createElement('DIV'); 
        alerta.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
        'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block">${message}</span>
        `; 

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }
}

function consultarAPI(city, country){

 const appId = 'ea2e452e69cc4e8954a79efc1178ae99'; 
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
 //console.log(url); 
 Spinner();
 fetch(url)
 .then( respons => respons.json() )
 .then( data => {
    if(data.cod == "404"){
      mostrarError('Ciudad No encontrada');
      console.log(data);
      return;
    }
    setTimeout(() => {
        limpiarHTML(); 
        mostrarClima(data);
    }, 1500);
  
 })
}

function mostrarClima(data){
   
   const { name, main:{temp, temp_max, temp_min } } = data;
   const temCelcius = parseInt(temp - 273.15);
   const temMaxCelcius = parseInt(temp_max - 273.15);
   const temMinCelcius = parseInt(temp_min - 273.15);

   const nameCity = document.createElement('P'); 
   nameCity.textContent = `Clima en: ${name}`;
   nameCity.classList.add('font-bold', 'text-2xl');

   const actual = document.createElement('P'); 
   actual.innerHTML = `${temCelcius} &#8451;`;
   actual.classList.add('font-bold', 'text-6xl');
   
   const tempMax = document.createElement('P'); 
   tempMax.innerHTML = `Max: ${temMaxCelcius} &#8451;`;
   tempMax.classList.add('text-xl');

   const tempMin = document.createElement('P'); 
   tempMin.innerHTML = `Min: ${temMinCelcius} &#8451;`;
   tempMin.classList.add('text-xl');

   const resultadoDIV = document.createElement('DIV');
   resultadoDIV.classList.add('text-center', 'text-white'); 
   resultadoDIV.appendChild(nameCity);
   resultadoDIV.appendChild(actual);
   resultadoDIV.appendChild(tempMax);
   resultadoDIV.appendChild(tempMin);
   resultado.appendChild(resultadoDIV); 
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
  }

function Spinner() {

  
  
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
  
    divSpinner.innerHTML = `
    <div class="spinner">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
    </div>
    `;
    limpiarHTML(); 
    resultado.appendChild(divSpinner);
  }