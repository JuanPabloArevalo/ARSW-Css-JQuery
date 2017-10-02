/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//@author hcadavid

var apimock=(function(){

	var mockdata=[];
        mockdata["juanPablo"]=[
            {author:"juanPablo","points":[{"x":450,"y":200}],"name":"Casa"},
            {author:"juanPablo","points":[{"x":7,"y":10},{"x":17,"y":24}],"name":"Universidad"},
            {author:"juanPablo","points":[{"x":21,"y":5},{"x":7,"y":1}, {"x":3,"y":10}, {"x":8,"y":9}, {"x":12,"y":24}],"name":"Oficina"},
            {author:"juanPablo","points":[{"x":18,"y":16},{"x":41,"y":13}, {"x":71,"y":41}, {"x":12,"y":32}, {"x":105,"y":11}],"name":"Bogota"}
        ];
	mockdata["johnconnor"]=	[
            {author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
            {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"},
            {author:"johnconnor","points":[{"x":44,"y":55},{"x":77,"y":88}, {"x":20,"y":100}, {"x":27,"y":15}, {"x":42,"y":57}],"name":"miCasa"},
            {author:"johnconnor","points":[{"x":4,"y":2},{"x":8,"y":12}, {"x":21,"y":32}, {"x":77,"y":7}, {"x":10,"y":11}],"name":"miOficina"},
            {author:"johnconnor","points":[{"x":5,"y":5},{"x":10,"y":20}, {"x":20,"y":40}, {"x":14,"y":80}, {"x":17,"y":80}, {"x":24,"y":85}, {"x":190,"y":130}, {"x":85,"y":150}, {"x":12,"y":21}],"name":"miLote"}
        ];
	mockdata["maryweyland"]=[
            {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
            {author:"maryweyland","points":[{"x":5,"y":4},{"x":8,"y":16}],"name":"gear2"}
        ];
        


	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}	

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}
apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/
