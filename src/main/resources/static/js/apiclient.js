/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apiclient=(function(){

	return {
		getBlueprintsByAuthor:function(authname,callback){
			 $.get("/blueprints/"+authname,callback); 
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
			$.get("/blueprints/"+authname+"/"+bpname,callback); 
		},
                setBluePrintByNameAndAuthor:function(authname,bpname,points){
                        return $.ajax({
                            url: "/blueprints/"+authname+"/"+bpname,
                            type: 'PUT',
                            data: '{"author":"'+authname+'","name":"'+bpname+'", "points":'+JSON.stringify(points)+'}',
                            contentType: "application/json"
                        });
                        
                },
                addNewBluePrint:function(authname,bpname,points, callback){
                    $.post("demo_ajax_gethint.asp", {suggest: txt}, callback)
                    
                }
                
	};	

})();

