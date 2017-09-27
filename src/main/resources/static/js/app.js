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
                ctx = inicializarPlano();
                lbp.points.map(dibujarMapa);
                ctx.stroke(); 
                }
            );
        } 
    };
})();

function transformarMapa(item) {
    return {nombre:item.name, cantidadPuntos:item.points.length};
}

function inicializarElementos(){
    $(".filas").remove("tr");
    document.getElementById("totalPuntosCalculados").innerHTML = "";
    document.getElementById("autorSeleccionado").innerHTML = "";
}

function adicionarFila(item){
    var markup = "<tr class=\"filas\"><td>" + item.nombre + "</td><td>" + item.cantidadPuntos + "</td><td><button type=\"button\" class=\"btn btn-success\" onclick=\"app.actualizarPlano('"+item.nombre+"')\">Open</button></td></tr>";
    $("table tbody").append(markup);
}

function calcularTotalPuntos(previousValue, currentValue){
    return previousValue + currentValue;
}

function actualizarAutorDom(autorSeleccionado){
    document.getElementById("autorSeleccionado").innerHTML = autorSeleccionado+"' blueprints";
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