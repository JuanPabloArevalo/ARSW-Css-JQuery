/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.filtroInter;

import edu.eci.arsw.blueprints.model.Blueprint;

/**
 *
 * @author JuanArevaloMerchan y Stefany Moron
 */
public interface Filtro {
    
    /**
     * Metodo encargado de filtrar un plano
     * @param bp
     * @return El plano filtrado
     */
    public Blueprint getBluePrintFiltrado(Blueprint bp);
    
}
