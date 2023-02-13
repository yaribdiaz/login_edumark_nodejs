import eventosListado from "./eventosListado.js";




function informacion(tech){





    const container = document.querySelector('.cards-events')
    const contenedor = document.createElement('div')
    contenedor.classList.add('card-events')
    container.appendChild(contenedor)
  
    //FONDO DE PROGRAMA/EVENTO
    const fondo = document.createElement('div')
    fondo.classList.add('background')
    fondo.style.backgroundImage = tech.imagen;
    contenedor.appendChild(fondo)

    //CREACION DIV PARA CONTENIDO DE TEXTO
    const texto = document.createElement('div')
    texto.classList.add('text')
    contenedor.appendChild(texto)

    //LUGAR DE EVENTO
    const featured =document.createElement('span')
    featured.classList.add('featured')
    featured.textContent=(tech.lugar)
    texto.appendChild(featured)
   
    
    //FECHA DE EVENTO
    const fecha = document.createElement('span')
    fecha.classList.add('date')
    fecha.textContent=(tech.fecha)
    texto.appendChild(fecha)

    const hora = document.createElement('span')
    hora.classList.add('date')
    hora.textContent=(tech.hora)
    texto.appendChild(hora)
    
    //FECHA DE EVENTO
    const estadoDeEvento = document.createElement('span')
    estadoDeEvento.classList.add('estado-evento')
    texto.appendChild(estadoDeEvento)


        //DÍA/MES/AÑO    DÍA/MES/AÑO    DÍA/MES/AÑO    DÍA/MES/AÑO    
        //DÍA/MES/AÑO    DÍA/MES/AÑO    DÍA/MES/AÑO    DÍA/MES/AÑO    

        var date = new Date()
        var day = `${(date.getDate())}`.padStart(2,'0');
        var month = `${(date.getMonth()+1)}`.padStart(2,'0');
        var year = date.getFullYear();
        var fechaActual =`${day}/${month}/${year}`
      

        var inp1 = fechaActual
        var inp2 = tech.fecha
        // convierte las fechas a yyyymmdd
        var tmp = inp1.split('/');
        var fini = tmp[2]+tmp[1]+tmp[0];
        tmp = inp2.split('/');
        var ffin = tmp[2]+tmp[1]+tmp[0];
        
        
        if (fini>ffin) {
            //console.log(tech.lugar+' ya pasó')
            estadoDeEvento.textContent=('Evento pasado📆')
            estadoDeEvento.classList.add('estado-evento-pasado')

        }
        if (fini<ffin) {
           // console.log(tech.lugar+' está próximo');
            estadoDeEvento.textContent=('Próximo🕒')
            estadoDeEvento.classList.add('estado-evento-proximo')
        }
        if(fini==ffin) {
         // console.log(tech.lugar+' es hoy!');
          estadoDeEvento.textContent=('🎉¡Es hoy!🎊')
          estadoDeEvento.classList.add('estado-evento-hoy')
        }







    //NOMBRE DE EVENTO
    const titulo = document.createElement('h2')
    titulo.classList.add('title')
    titulo.textContent=(tech.titulo)
    texto.appendChild(titulo)

    //DESCRIPCION EVENTO
    const descripcion = document.createElement('h3')
    descripcion.classList.add('subtitle')
    descripcion.textContent=(tech.descripcion)
    texto.appendChild(descripcion)

    //INSERCION DIV PARA BOTONES
    const buttonCards = document.createElement('div')
    buttonCards.classList.add('card-button', 'button-space', 'wrap')
    texto.appendChild(buttonCards)

    //BOTON VER MAS
    const buttonVer = document.createElement('a')
    buttonVer.classList.add('read-now', 'button-blanco', 'js-open-modal')
    buttonVer.setAttribute('id','open')
    buttonVer.textContent=('Ver más')
    buttonCards.appendChild(buttonVer)
   

    const contenedorMayorModal=document.createElement('div')
    contenedorMayorModal.setAttribute('id','mask')
    contenedorMayorModal.classList.add('hidden')
    buttonCards.appendChild(contenedorMayorModal)

    //CONTENEDOR  MODAL
    const cntr= document.createElement('div')
    cntr.setAttribute('id','modal')
    cntr.classList.add('hidden')
    texto.appendChild(cntr)




    const tituloDetalles=document.createElement('h3')
    tituloDetalles.classList.add('nombreBold','tituloModal')
    tituloDetalles.textContent=('Detalles de Evento')
    cntr.appendChild(tituloDetalles)






    const contenedorFlex=document.createElement('div')
    contenedorFlex.classList.add('centrar-detalles-ventana')
    cntr.appendChild(contenedorFlex)  

    const contenedorTexto=document.createElement('div')
    contenedorTexto.classList.add('contenedor-texto')
    contenedorFlex.appendChild(contenedorTexto)  






    const nombreBold=document.createElement('a')
    nombreBold.classList.add('nombreBold')
    nombreBold.textContent=('Evento')
    contenedorTexto.appendChild(nombreBold)

    const textoM= document.createElement('p')
    textoM.classList.add('modal__title')
    textoM.textContent=(tech.titulo)
    contenedorTexto.appendChild(textoM)


    const nombreBold2=document.createElement('a')
    nombreBold2.classList.add('nombreBold')
    nombreBold2.textContent=('Lugar')
    contenedorTexto.appendChild(nombreBold2)
    
    const textoM2 = document.createElement('p')
    textoM2.classList.add('modal__content')
    textoM2.textContent=(tech.lugar)
    contenedorTexto.appendChild(textoM2)



    const nombreBold4=document.createElement('a')
    nombreBold4.classList.add('nombreBold')
    nombreBold4.textContent=('Hora')
    contenedorTexto.appendChild(nombreBold4)

    const textoM4 = document.createElement('p')
    textoM4.classList.add('modal__content')
    textoM4.textContent=(tech.hora)
    contenedorTexto.appendChild(textoM4)




        //IMAGEN  IMAGEN  IMAGEN  IMAGEN  IMAGEN  IMAGEN  IMAGEN  IMAGEN  IMAGEN  
    const contenedorImagen=document.createElement('div')
    contenedorImagen.classList.add('background-detalles')
    contenedorImagen.style.backgroundImage = tech.imagen;
    contenedorFlex.appendChild(contenedorImagen) 






    const nombreBold3=document.createElement('a')
    nombreBold3.classList.add('nombreBold')
    nombreBold3.textContent=('Descripción')
    cntr.appendChild(nombreBold3)

    const textoM3 = document.createElement('p')
    textoM3.classList.add('modal__content')
    textoM3.textContent=(tech.descripcionCompleta)
    cntr.appendChild(textoM3)


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




  



    function limpiador(){
        const elements = document.getElementsByClassName("card-events");
      
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
     
    }

 
   

    



var foco=false


var checkbox = document.querySelector("#checkbox");
checkbox.addEventListener('change', function() {
  
  
  if (this.checked) {
    console.log('prendido')
    foco=true
    limpiador()
    corre()
    
  } else{
    console.log('apagado')
    foco=false
    limpiador()
    corre()
    
  } 
}) 







function corre (){

  var date = new Date()
  var day = `${(date.getDate())}`.padStart(2,'0');
  var month = `${(date.getMonth()+1)}`.padStart(2,'0');
  var year = date.getFullYear();
  var fechaActual =`${day}/${month}/${year}`


 const arrayForeach =eventosListado.forEach (function (tech){
  
  
  var inp1 = fechaActual
  var inp2 = tech.fecha
  // convierte las fechas a yyyymmdd
  var tmp = inp1.split('/');
  var fini = tmp[2]+tmp[1]+tmp[0];
  tmp = inp2.split('/');
  var ffin = tmp[2]+tmp[1]+tmp[0];



  if(foco==false){
    informacion(tech)
    }
  if(foco==true && fini<=ffin){
  informacion(tech)
  }
  })
    console.log(foco)
  }



corre()
   
