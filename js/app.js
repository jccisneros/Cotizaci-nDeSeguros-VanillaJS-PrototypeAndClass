const max = new Date().getFullYear(),
      min = max - 20;    
const selectAnios = document.getElementById('anio');
const formulario = document.getElementById('cotizar-seguro');
const resultado = document.getElementById('resultado');

//funciones-clases

function Seguro(marca, anio, tipo){
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo; 
}

function Interfaz() {};

//prototype

Interfaz.prototype.mensaje = (mensaje, tipo) => {

  const div = document.createElement('div');  

  if(tipo === 'error'){   
  
    div.classList.add('mensaje', 'error') ;

  }else{
    
    div.classList.add('mensaje', 'correcto') ;

  }

  div.innerHTML = `${mensaje}`;    
  formulario.insertBefore(div, document.querySelector('.form-group'));  
  
  setTimeout( () =>{

    document.querySelector('.mensaje').remove();

  }, 2500);
  

}

Interfaz.prototype.mostrarResultado = (seguro, cantidad) => {

  let marca;
  let tipo;

  switch(seguro.marca){
    case '1':
      marca = "Americano";
      break;
    case '2':
      marca = "Asiático";
      break;
    case '3':
      marca = "Europeo";
      break;
  }

  switch(seguro.tipo){
    case 'basico':
      tipo = "Básico";
      break;
    case 'completo':
      tipo = "Completo";
      break;    
  }

  const div = document.createElement('div');  

  div.innerHTML = `
    <p class="header"> Resultado </p>
    <p class="mt-3">Procedencia del vehículo: ${marca}</p>
    <p>Año del vehículo: ${seguro.anio}</p>
    <p>Tipo de seguro: ${tipo}</p>
    <p class="pt-4 font-weight-bold">Cantidad a pagar: ${cantidad}</p>
  `
  const spinner = document.querySelector('#cargando img');
  spinner.style.display = "block";
  
  setTimeout( () => {
    spinner.style.display = "none";
    resultado.appendChild(div);
  }, 2000);  

}

Seguro.prototype.cotizarSeguro = (informacion) => {
   
  let cantidad;
  const base = 2000;

  switch(informacion.marca){

    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;

  }  

  const diferenciaAnios = new Date().getFullYear() - informacion.anio;

  cantidad -= (diferenciaAnios * 3 ) * cantidad / 100;

  if(informacion.tipo === 'basico'){
    cantidad *= 1.30;
  }else{
    cantidad *= 1.50;
  }
  
  return cantidad;

}

//eventListeners

formulario.addEventListener('submit', (e) => {

  const marca = document.getElementById('marca');
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;
  const anioSelecionado = anio.options[anio.selectedIndex].value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  console.log(tipo);
  e.preventDefault();

  const interfaz = new Interfaz();  

  if( marcaSeleccionada === "" || anioSelecionado === "" || tipo === "" ){ 
    
    interfaz.mensaje('¡Error! Complete todos los campos.', 'error');

  }else{

    const resultados = document.querySelector('#resultado div');
    
    if(resultados != null){
      resultados.remove();
    }    
    
    const seguro = new Seguro(marcaSeleccionada, anioSelecionado, tipo);
    const cantidad = seguro.cotizarSeguro(seguro);

    interfaz.mensaje('Cotizando...', 'exito');
    interfaz.mostrarResultado(seguro, cantidad);    

  }
})

//DOM
for ( let i = max; i > min; i-- ) {
  let option = document.createElement('option');
  option.value = i;
  option.innerHTML = i;  
  selectAnios.appendChild(option);
}