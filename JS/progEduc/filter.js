
import programasListado from "./programasEducativos.js";


//GENERADOR PROGRAMAS

// const arrayForeach =programasListado.forEach (function (tech){

//     const container = document.querySelector('.cards-events')
    

//     const contenedor = document.createElement('div')
//     contenedor.classList.add('card-events')
//     container.appendChild(contenedor)
  
//     //FONDO DE PROGRAMA/EVENTO
//     const fondo = document.createElement('div')
//     fondo.classList.add('background')
//     contenedor.appendChild(fondo)
//     fondo.style.backgroundImage = tech.imagen;

//     //CREACION DIV PARA CONTENIDO DE TEXTO
//     const texto = document.createElement('div')
//     texto.classList.add('text')
//     contenedor.appendChild(texto)

//     //INSERCIÓN ID
//     const featured =document.createElement('span')
//     featured.classList.add('featured')
//     featured.textContent=(tech.id)
//     texto.appendChild(featured)
    
//     //INSERCIÓN PAIS
//     const fecha = document.createElement('span')
//     fecha.classList.add('date')
//     fecha.textContent=(tech.pais)
//     texto.appendChild(fecha)

//     //INSERCION TIPO DE PROGRAMA
//     const titulo = document.createElement('h2')
//     titulo.classList.add('title')
//     titulo.textContent=(tech.programa)
//     texto.appendChild(titulo)

//     //INSERCION DESCRIPCION
//     const descripcion = document.createElement('h3')
//     descripcion.classList.add('subtitle')
//     descripcion.textContent=(tech.descripcion)
//     texto.appendChild(descripcion)

//     //INSERCION DIV PARA BOTONES
//     const buttonCards = document.createElement('div')
//     buttonCards.classList.add('card-button', 'button-space')
//     texto.appendChild(buttonCards)

//     //INSERCIÓN BOTON
//     const buttonVer = document.createElement('a')
//     buttonVer.classList.add('read-now', 'button-blanco')
//     buttonVer.textContent=('Detalles')
//     buttonCards.appendChild(buttonVer)
   
//     //INSERCIÓN BOTON
//     const buttonInteresado = document.createElement('a')
//     buttonInteresado.classList.add('read-now', 'button-rojo')
//     buttonInteresado.textContent=('Me interesa')
//     buttonCards.appendChild(buttonInteresado)

//     })







function informacion(tech){

    



    const container = document.querySelector('.cards-events')
    
    const contenedor = document.createElement('div')
    contenedor.classList.add('card-events')
    container.appendChild(contenedor)
  
    //FONDO DE PROGRAMA/EVENTO
    const fondo = document.createElement('div')
    fondo.classList.add('background')
    contenedor.appendChild(fondo)
    fondo.style.backgroundImage = tech.imagen;
    
    //CREACION DIV PARA CONTENIDO DE TEXTO
    const texto = document.createElement('div')
    texto.classList.add('text')
    contenedor.appendChild(texto)

    //INSERCIÓN ID
    const featured =document.createElement('span')
    featured.classList.add('featured')
    featured.textContent=(tech.id)
    texto.appendChild(featured)
   
    //INSERCIÓN PAIS
    const fecha = document.createElement('span')
    fecha.classList.add('date')
    fecha.textContent=(tech.pais)
    texto.appendChild(fecha)

    //INSERCION TIPO DE PROGRAMA
    const titulo = document.createElement('h2')
    titulo.classList.add('title')
    titulo.textContent=(tech.programa)
    texto.appendChild(titulo)

    //INSERCION DESCRIPCION
    const descripcion = document.createElement('h3')
    descripcion.classList.add('subtitle')
    descripcion.textContent=(tech.descripcion)
    texto.appendChild(descripcion)

    //INSERCION DIV PARA BOTONES
    const buttonCards = document.createElement('div')
    buttonCards.classList.add('card-button', 'button-space', 'wrap')
    texto.appendChild(buttonCards)



    //BOTON DETALLES
    const buttonVer = document.createElement('a')
    buttonVer.classList.add('read-now', 'button-blanco', 'js-open-modal')
    buttonVer.setAttribute('id','open')
    buttonVer.textContent=('Detalles')
    buttonCards.appendChild(buttonVer)



    //BOTON ME INTERESA
    const removeSpacesFromString = (textoOriginal) => { 
    let text1 = textoOriginal
    let text2 =  
        text1.replace(/ /g, "%20"); 
   return text2
    } 

    const buttonInteresado = document.createElement('a')
    buttonInteresado.classList.add('read-now', 'button-rojo')
    buttonInteresado.setAttribute('target','_blank')
    buttonInteresado.setAttribute('href','https://web.whatsapp.com/send?phone='+'56992710472'+'&text='+'Informes%20de%20programa:%20'+tech.id+'%20'+removeSpacesFromString(tech.programa)+'%20en%20'+removeSpacesFromString(tech.pais)+'📚')
    buttonInteresado.textContent=('Me interesa')
    buttonCards.appendChild(buttonInteresado)

    

    const contenedorMayorModal=document.createElement('div')
    contenedorMayorModal.setAttribute('id','mask')
    contenedorMayorModal.classList.add('hidden')
    buttonCards.appendChild(contenedorMayorModal)

    //CONTENEDOR  MODAL  CONTENEDOR  MODAL  CONTENEDOR  MODAL  CONTENEDOR  MODAL  CONTENEDOR  MODAL  CONTENEDOR  MODAL  CONTENEDOR  MODAL   
    const cntr= document.createElement('div')
    cntr.setAttribute('id','modal')
    cntr.classList.add('hidden')
    texto.appendChild(cntr)





    const tituloDetalles=document.createElement('h3')
    tituloDetalles.classList.add('nombreBold','tituloModal')
    tituloDetalles.textContent=('Detalles del Programa')
    cntr.appendChild(tituloDetalles)


    

    const contenedorFlex=document.createElement('div')
    contenedorFlex.classList.add('centrar-detalles-ventana')
    cntr.appendChild(contenedorFlex)  







    const contenedorTexto=document.createElement('div')
    contenedorTexto.classList.add('contenedor-texto')
    contenedorFlex.appendChild(contenedorTexto)  
    

    
    const nombreBold=document.createElement('a')
    nombreBold.classList.add('nombreBold')
    nombreBold.textContent=('Programa ')
    contenedorTexto.appendChild(nombreBold)

    const textoM= document.createElement('p')
    textoM.classList.add('modal__title')
    textoM.textContent=(tech.programa)
    contenedorTexto.appendChild(textoM)



    const nombreBold2=document.createElement('a')
    nombreBold2.classList.add('nombreBold')
    nombreBold2.textContent=('País ')
    contenedorTexto.appendChild(nombreBold2)
    
    const textoM2 = document.createElement('p')
    textoM2.classList.add('modal__content')
    textoM2.textContent=(tech.pais)
    contenedorTexto.appendChild(textoM2)




    const nombreBold3=document.createElement('a')
    nombreBold3.classList.add('nombreBold')
    nombreBold3.textContent=('Ingreso ')
    contenedorTexto.appendChild(nombreBold3)

    const textoM3 = document.createElement('p')
    textoM3.classList.add('modal__content')
    textoM3.textContent=(tech.ingreso)
    contenedorTexto.appendChild(textoM3)



    const nombreBold6=document.createElement('a')
    nombreBold6.classList.add('nombreBold')
    nombreBold6.textContent=('Precio ')
    contenedorTexto.appendChild(nombreBold6)
    
    const textoM6 = document.createElement('p')
    textoM6.classList.add('modal__content')
    textoM6.textContent=(tech.precio)
    contenedorTexto.appendChild(textoM6)
    



    const nombreBold7=document.createElement('a')
    nombreBold7.classList.add('nombreBold')
    nombreBold7.textContent=('Nivel de Inglés ')
    contenedorTexto.appendChild(nombreBold7)

    const textoM7 = document.createElement('p')
    textoM7.classList.add('modal__content')
    textoM7.textContent=(tech.nivelIngles)
    contenedorTexto.appendChild(textoM7)
    


    const nombreBold5=document.createElement('a')
    nombreBold5.classList.add('nombreBold')
    nombreBold5.textContent=('Beca ')
    contenedorTexto.appendChild(nombreBold5)

    const textoM5 = document.createElement('p')
    textoM5.classList.add('modal__content')
    textoM5.textContent=(tech.beca)
    contenedorTexto.appendChild(textoM5)


    const contenedorImagen=document.createElement('div')
    contenedorImagen.classList.add('background-detalles')
    contenedorImagen.style.backgroundImage = tech.imagen;
    contenedorFlex.appendChild(contenedorImagen) 





    const nombreBold4=document.createElement('a')
    nombreBold4.classList.add('nombreBold')
    nombreBold4.textContent=('Perfil')
    cntr.appendChild(nombreBold4)

    const textoM4 = document.createElement('p')
    textoM4.classList.add('modal__content')
    textoM4.textContent=(tech.perfil)
    cntr.appendChild(textoM4)



    
    const nombreBold8=document.createElement('a')
    nombreBold8.classList.add('nombreBold')
    nombreBold8.textContent=('¿Porqué escoger este programa? ')
    cntr.appendChild(nombreBold8)
    
    const textoM8 = document.createElement('p')
    textoM8.classList.add('modal__content')
    textoM8.textContent=(tech.razones)
    cntr.appendChild(textoM8)
    



    const nombreBold9=document.createElement('a')
    nombreBold9.classList.add('nombreBold')
    nombreBold9.textContent=('Descripción ')
    cntr.appendChild(nombreBold9)

    const textoM9 = document.createElement('p')
    textoM9.classList.add('modal__content')
    textoM9.textContent=(tech.descripcion)
    cntr.appendChild(textoM9)
    


    //CERRAR MODAL
    const cerrarModal =document.createElement('a')
    cerrarModal.classList.add('js-close')
    cerrarModal.setAttribute('id','close')
    cerrarModal.textContent=('Cerrar')
    cntr.appendChild(cerrarModal)



      buttonVer.addEventListener('click', function () {
        cntr.classList.remove('hidden');
        contenedorMayorModal.classList.remove('hidden');
      });
      cerrarModal.addEventListener('click', function () {
        cntr.classList.add('hidden');
        contenedorMayorModal.classList.add('hidden');
      });
      contenedorMayorModal.addEventListener('click', function () {
        cntr.classList.add('hidden');
        contenedorMayorModal.classList.add('hidden');
      });

     
      
      
     
      
      
}






var foco= true

var select = document.getElementById('button-programa');
select.addEventListener('change',
  function(){
    var selectedOption = this.options[select.selectedIndex];
    //console.log(selectedOption.value + ': ' + selectedOption.text);
  });
  


  var select2 = document.getElementById('button-pais');
  select2.addEventListener('change',
    function(){
      var selectedOption2 = this.options[select2.selectedIndex];
     // console.log(selectedOption2.value + ': ' + selectedOption2.text); 
    });



    function limpiador(){
        const elements = document.getElementsByClassName("card-events");
        const elements2 = document.getElementsByClassName("sin-resultado");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        while(elements2.length > 0){
          elements2[0].parentNode.removeChild(elements2[0]);
      }
       
    }



    function resetSelects(){
        var options = document.querySelectorAll('#button-programa option');
        for (var i = 0, l = options.length; i < l; i++) {
         options[i].selected = options[i].defaultSelected;
        }
         var options2 = document.querySelectorAll('#button-pais option');
        for (var i = 0, l = options2.length; i < l; i++) {
         options2[i].selected = options2[i].defaultSelected;
    }    }



    const limpiar = document.getElementById('limpiar')
    limpiar.addEventListener('click', e => {
        e.preventDefault() 
        resetSelects()
        foco=true
        if(foco==true){
            limpiador()
            buscador()
            
        }
        console.log('limpiar:'+ foco)
        
    })

    
  
    const buscar = document.querySelector('#formulario')
    buscar.addEventListener('submit', e => {
        e.preventDefault()
        limpiador()
        
        const program = document.querySelector('#button-programa').value
        const paises = document.querySelector('#button-pais').value
        console.log(program, paises)
       foco=false
        console.log('buscar:'+ foco)
        buscador(program,paises)
    })


    

    if(foco==true){
        buscador()
    }


    function buscador(uno,dos){
    var cont=0
    const arrayForeach =programasListado.forEach (function (tech){
    
      
    if(foco ==true){
            informacion(tech) 
            cont++
    }
    if(tech.programa==uno && tech.pais==dos){
        informacion(tech)  
        console.log('hola1')
        cont++
}
if(uno=="" && tech.pais==dos){
    informacion(tech)
    cont++
}
if(tech.programa==uno && dos==""){
   informacion(tech) 
   cont++
}
if(uno=='' && dos==''){
  informacion(tech)
  cont++
}

})  
console.log(cont)

if(cont==0){

  const container = document.querySelector('.eventoss')

  const contenedorAviso=document.createElement('div')
  contenedorAviso.classList.add('contenedor-aviso')
  container.appendChild(contenedorAviso)

  const sinResultado=document.createElement('p')
  sinResultado.classList.add('sin-resultado')
  sinResultado.textContent=('Aún no hay programas con estas características')
  contenedorAviso.appendChild(sinResultado)
}
}


