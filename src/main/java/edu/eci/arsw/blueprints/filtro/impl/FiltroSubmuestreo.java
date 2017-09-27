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
import org.springframework.stereotype.Service;

/**
 *
 * @author JuanArevaloMerchan
 */
@Service
public class FiltroSubmuestreo implements Filtro{

    @Override
    public Blueprint getBluePrintFiltrado(Blueprint bp) {
        List<Point> puntos = new ArrayList<>();
        puntos.addAll(bp.getPoints());
        for(int i=0; i<bp.getPoints().size();i++ ){
            if(i%2!=0){
                puntos.remove(bp.getPoints().get(i));
            }
        }
        bp.setPoints(puntos);
        return bp;}
    
}
