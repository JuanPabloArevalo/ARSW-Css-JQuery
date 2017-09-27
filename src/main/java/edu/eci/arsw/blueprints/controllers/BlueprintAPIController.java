/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {
    @Autowired
    BlueprintsServices bp= null;
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetAllBlueprintFilter(){
        return new ResponseEntity<>(bp.getPlanosFiltrados(),HttpStatus.ACCEPTED);
    
    }

    @RequestMapping(path ="/{author}",method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetBlueprintByAuthor(@PathVariable ("author") String nombreAutor){
        try {
            return new ResponseEntity<>(bp.getBlueprintsByAuthor(nombreAutor),HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error en el manejadorGetRecursoBlueprint",HttpStatus.NOT_FOUND);
        }        
    }
    
    @RequestMapping(path ="/{author}/{name}",method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetBlueprintByAuthorAndName(@PathVariable ("author") String nombreAutor, @PathVariable ("name") String nombrePlano){
        try {
            return new ResponseEntity<>(bp.getBlueprint(nombreAutor, nombrePlano),HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }        
    }
    
    @RequestMapping(method = RequestMethod.POST)	
    public ResponseEntity<?> manejadorPostRecursoAdicionarPlano(@RequestBody Blueprint newBp){
        
        try {
            bp.addNewBlueprint(newBp);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.FORBIDDEN);            
        }        

    }
    
    @RequestMapping(path = "/{author}/{name}",method = RequestMethod.PUT)	
    public ResponseEntity<?> manejadorPostRecursoCambiarPlano(@PathVariable ("author") String author, @PathVariable ("name") String name, @RequestBody Blueprint newBp ){
        
        try {
            bp.modifyOrAddBlueprint(newBp, author, name);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.FORBIDDEN);
        }
    }
}

