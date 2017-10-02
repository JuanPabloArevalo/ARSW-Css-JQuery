/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apiclient=(function(){

	return {
		getBlueprintsByAuthor:function(authname,callback){
                    return $.get("/blueprints/"+authname,callback); 
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
                    return $.get("/blueprints/"+authname+"/"+bpname,callback); 
		},
                setBluePrintByNameAndAuthor:function(authname,bpname,points){
                    return $.ajax({
                        url: "/blueprints/"+authname+"/"+bpname,
                        type: 'PUT',
                        data: '{"author":"'+authname+'","name":"'+bpname+'", "points":'+JSON.stringify(points)+'}',
                        contentType: "application/json"
                    });
                        
                },
                addNewBluePrint:function(authname,bpname,points){
                    return $.ajax({
                        url: "/blueprints",
                        type: 'POST',
                        data: '{"author":"'+authname+'","name":"'+bpname+'", "points":'+JSON.stringify(points)+'}',
                        contentType: "application/json"
                    });
                },
                deleteBluePrint:function(authname,bpname,points){
                     return $.ajax({
                        url: "/blueprints/"+authname+"/"+bpname,
                        type: 'DELETE',
                        data: '{"author":"'+authname+'","name":"'+bpname+'", "points":'+JSON.stringify(points)+'}',
                        contentType: "application/json"
                    });
                }
	};	

})();

