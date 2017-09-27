/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.filtro.impl;

import edu.eci.arsw.blueprints.filtroInter.Filtro;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author JuanArevaloMerchan
 */

public class FiltroRedundancias implements Filtro{

    @Override
    public Blueprint getBluePrintFiltrado(Blueprint bp) {
        List<Point> puntos = new ArrayList<>();
        puntos.addAll(bp.getPoints());
        for(int i=0; i<bp.getPoints().size()-1;i++ ){
            if(bp.getPoints().get(i).sonPuntosIgual(bp.getPoints().get(i+1))){
                puntos.remove(bp.getPoints().get(i));
            }
        }
        bp.setPoints(puntos);
        return bp;
    }
    
}
