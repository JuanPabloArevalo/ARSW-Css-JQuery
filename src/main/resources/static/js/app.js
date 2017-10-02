/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = (function(){
    var nombreAutorSeleccionado;
    var planos = [];
    var nombrePlanoSeleccionado;
    var tipo = apiclient;
    var puntosTemporales = [];
    var puedeModificarCanvas = "N";
    var estaModificando = "N";
    var puedeCrearNuevoPlano = "N";
    
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
                    $("#idDivAdicionarPlano").hide(); 
                    puedeCrearNuevoPlano = "S";
                } 
            );            
        },
        actualizarNombreAutor: function(){
              document.getElementById("autorSeleccionado").innerHTML = nombreAutorSeleccionado+"' blueprints";
        },
        actualizarPlano:function(nombrePlano){
            nombrePlanoSeleccionado=nombrePlano;
            tipo.getBlueprintsByNameAndAuthor(nombreAutorSeleccionado, nombrePlanoSeleccionado, function(lbp){
                actualizarNombrePlanoDom(nombrePlanoSeleccionado); 
                puedeModificarCanvas = "S";
                estaModificando = "S";
                inicializarPlano();
                puntosTemporales = lbp.points;
                puntosTemporales.map(dibujarMapa);
                $("#idDivAdicionarPlano").hide(); 
                }
            );
        },
        addNewBluePrint: function(){
            if(puedeCrearNuevoPlano==="S"){
                $("#idDivAdicionarPlano").show(); 
                $("#idMapaDibujado").text("");
                $("#idNombrePlano").val("")
                inicializarPlano();
                puedeModificarCanvas = "S";
                estaModificando = "N";
                puntosTemporales = [];
            }
            else{
                alert("No ha seleccionado ningun autor");
            }    
        },
        init:function(){
            var canvas = document.getElementById("myCanvas");
            //if PointerEvent is suppported by the browser:
            if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event){
                    if(puedeModificarCanvas==="S"){
                        let rect = document.getElementById("myCanvas").getBoundingClientRect();
                        let puntoX = parseInt(event.clientX - rect.left);
                        let puntoY = parseInt(event.clientY - rect.top);                        
                        inicializarPlano();
                        puntosTemporales = adicionarPunto(puntosTemporales,puntoX, puntoY);
                        puntosTemporales.map(dibujarMapa); 
                    }
                });
            }
            else {
                canvas.addEventListener("mousedown", function(event){
                    if(puedeModificarCanvas==="S"){
                        let rect = document.getElementById("myCanvas").getBoundingClientRect();
                        let puntoX = parseInt(event.clientX - rect.left);
                        let puntoY = parseInt(event.clientY - rect.top);                        
                        inicializarPlano();
                        puntosTemporales = adicionarPunto(puntosTemporales,puntoX, puntoY);
                        puntosTemporales.map(dibujarMapa); 
                    }
                 }
            );
            }
        },
        modificarOCrear:function(){
            if(estaModificando==="S"){
                let promesaPut = tipo.setBluePrintByNameAndAuthor(nombreAutorSeleccionado,nombrePlanoSeleccionado,puntosTemporales);
                promesaPut.then(
                    function(){
                         app.actualizarInformacion();
                         inicializarPlano();
                         $("#idMapaDibujado").text("");
                    },
                    function(){
                        alert("Ha el siguiente error: "+promesaPost.responseText);
                    }
                );
            }
            else{
                app.asignarNombrePlanoNuevo();
                let promesaPost = tipo.addNewBluePrint(nombreAutorSeleccionado,nombrePlanoSeleccionado,puntosTemporales);
                promesaPost.then(
                    function(){
                         app.actualizarInformacion();
                         inicializarPlano();
                    },
                    function(){
                        alert("Ha el siguiente error: "+promesaPost.responseText);
                    }
                );
            }
         },
        deleteBluePrint:function(){
            let promesaDelete = tipo.deleteBluePrint(nombreAutorSeleccionado,nombrePlanoSeleccionado,puntosTemporales);
                promesaDelete.then(
                    function(){
                         app.actualizarInformacion();
                         inicializarPlano();
                         $("#idMapaDibujado").text("");
                    },
                    function(){
                        alert("Ha el siguiente error: "+promesaDelete.responseText);
                    }
                );
        },
         asignarNombrePlanoNuevo:function(){
             nombrePlanoSeleccionado = $('#idNombrePlano').val();   
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
    $("#totalPuntosCalculados").text("");
    $("#autorSeleccionado").text("");
}

function adicionarFila(item){
    var markup = "<tr class=\"filas\"><td>" + item.nombre + "</td><td>" + item.cantidadPuntos + "</td><td><button type=\"button\" class=\"btn btn-info\" onclick=\"app.actualizarPlano('"+item.nombre+"')\">Open</button></td></tr>";
    $("table tbody").append(markup);
}

function calcularTotalPuntos(previousValue, currentValue){
    return previousValue + currentValue;
}

function actualizarAutorDom(autorSeleccionado){
    $("#autorSeleccionado").text(autorSeleccionado+"' blueprints");
}
function actualizarTotalPuntosDom(totalPuntos){
    $("#totalPuntosCalculados").text(totalPuntos);
}
function actualizarNombrePlanoDom(nombrePlano){
    $("#idMapaDibujado").text(nombrePlano);
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
}
function dibujarMapa(item){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.lineTo(item.x, item.y);
    ctx.stroke();
}
