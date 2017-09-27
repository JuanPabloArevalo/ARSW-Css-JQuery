/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = (function(){
    var nombreAutorSeleccionado;
    var planos = [];
    var nombrePlanoSeleccionado;
    var ctx;
    var tipo = apimock;
    var puntosTemporales = [];
    var puedeModificarCanvas = "N";
    
    changeNombreAutorSeleccionado = function(){
        nombreAutorSeleccionado = $('#autorABuscar').val();     
    } ;
   
    return{
        actualizarInformacion:function(){
            changeNombreAutorSeleccionado();
            tipo.getBlueprintsByAuthor(nombreAutorSeleccionado, function(lbp){ 
                    planos = lbp.map(transformarMapa); 
                    inicializarElementos();
                    planos.map(adicionarFila);  
                    actualizarTotalPuntosDom(sumarPuntos(planos)); 
                    actualizarAutorDom(nombreAutorSeleccionado);
                } 
            );            
        },
        getCtx:function(){
            return ctx;
        },
        actualizarNombreAutor: function(autorSeleccionado){
              document.getElementById("autorSeleccionado").innerHTML = autorSeleccionado+"' blueprints";
        },
        actualizarPlano:function(nombrePlano){
            nombrePlanoSeleccionado=nombrePlano;
            tipo.getBlueprintsByNameAndAuthor(nombreAutorSeleccionado, nombrePlanoSeleccionado, function(lbp){
                actualizarNombrePlanoDom(nombrePlanoSeleccionado); 
                puedeModificarCanvas = "S";
                puntosTemporales = [];
                ctx = inicializarPlano();
                puntosTemporales = lbp.points;
                console.info(puntosTemporales);
                puntosTemporales.map(dibujarMapa);
                ctx.stroke(); 
                }
            );
        }, 
        getPuntosTemporales:function(){
          return puntosTemporales;  
        },
        init:function(){
            //if PointerEvent is suppported by the browser:
            if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event){
                    if(puedeModificarCanvas==="S"){
                        alert('pointerdown at '+event.pageX+','+event.pageY); 
                        puntosTemporales = adicionarPunto(puntosTemporales,(event.pageX-$("#myCanvas").offset().left), (event.pageY-$("#myCanvas").offset().top));
                        console.info(puntosTemporales);
                        ctx = inicializarPlano();
                        puntosTemporales.map(dibujarMapa);
                        ctx.stroke(); 
                    }
                });
            }
            else {
                canvas.addEventListener("mousedown", function(event){
                    if(puedeModificarCanvas==="S"){
                        
                        alert('mousedown at '+(event.clientX-$("#myCanvas").offset().left)+','+(event.clientY-$("#myCanvas").offset().top)); 
                        console.info("LEFT:"+$("#myCanvas").offset().left);
                        console.info("X:"+event.clientX);
                        puntosTemporales = adicionarPunto(puntosTemporales,(event.clientX-$("#myCanvas").offset().left), (event.clientY-$("#myCanvas").offset().top));
                        console.info(puntosTemporales);
                        ctx = inicializarPlano();
                        puntosTemporales.map(dibujarMapa);
                        ctx.stroke(); 
                    }
                 }
            , true);
            }
        }
    };
})();

function transformarMapa(item) {
    return {nombre:item.name, cantidadPuntos:item.points.length};
}

function adicionarPunto(puntosTemporales, x, y){
    puntosTemporales.push({"x":x,"y":y});
    return puntosTemporales;
}

function inicializarElementos(){
    $(".filas").remove("tr");
    document.getElementById("totalPuntosCalculados").innerHTML = "";
    document.getElementById("autorSeleccionado").innerHTML = "";
}

function adicionarFila(item){
    var markup = "<tr class=\"filas\"><td>" + item.nombre + "</td><td>" + item.cantidadPuntos + "</td><td><button type=\"button\" class=\"btn btn-info\" onclick=\"app.actualizarPlano('"+item.nombre+"')\">Open</button></td></tr>";
    $("table tbody").append(markup);
}

function calcularTotalPuntos(previousValue, currentValue){
    return previousValue + currentValue;
}

function actualizarAutorDom(autorSeleccionado){
    document.getElementById("autorSeleccionado").innerHTML = autorSeleccionado+"' blueprints";
}
function traerPuntos(item){
    return item;
}
function actualizarTotalPuntosDom(totalPuntos){
    document.getElementById("totalPuntosCalculados").innerHTML = totalPuntos;
}
function actualizarNombrePlanoDom(nombrePlano){
    document.getElementById("idMapaDibujado").innerHTML = nombrePlano;
}
function sumarPuntos(planos){
    return (planos.map( function(item){return item.cantidadPuntos})).reduce(calcularTotalPuntos);    
}
function dibujarPuntosEnCanvas(lbp){
    alert(lbp.x);
}
function inicializarPlano(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.beginPath();
    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0,0,document.getElementById("myCanvas").width,document.getElementById("myCanvas").height);
    ctx.stroke();
    ctx.moveTo(0,0);
    return ctx;
}
function dibujarMapa(item){
    app.getCtx().lineTo(item.x, item.y);
}
