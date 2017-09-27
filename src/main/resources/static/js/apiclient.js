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
		}
	};	

})();

