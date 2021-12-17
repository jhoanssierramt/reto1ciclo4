/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.repositorio;

import co.edu.usa.ciclo4.modelo.Accessory;
import co.edu.usa.ciclo4.repositorio.crud.AccessoryCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author HeerJHobby
 */
@Repository
public class AccessoryRepository {

    @Autowired
    private AccessoryCrudRepository crud;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Accessory> getAll() {
        return (List<Accessory>) crud.findAll();
    }

    public Optional<Accessory> getAccessory(String id) {
        return crud.findById(id);
    }

    public Accessory save(Accessory accesorio) {
        return crud.save(accesorio);
    }
    /*
    public Optional<Accessory> getByReference(String referencia) {
        return crud.getAccessoryByReference(referencia);
    }
    */
    public void delete(Accessory accesorio){
        crud.delete(accesorio);
    }
    
    public List<Accessory> getProductByPrice(Double price){
        //return crudOrder.getOrderBySalesMan(id);
        /*
        Query query = new Query(); // Crear objeto de condición
        query.addCriteria(Criteria.where("price").is(price));
        List<Accessory> listaAccesorio = mongoTemplate.find(query,Accessory.class);
        return listaAccesorio;
        */
        return crud.getAccessoryByPrice(price);
    }
    
    /**
     * Aquí se usa una Expresión Regular (regex) con el fin de encontrar una 
     * palabra clave dentro de la descripción.
     * 
     * @param palabraClave
     * @return lista de productos
     */
    public List<Accessory> getProductsByDescription(String palabraClave){
        //"\W*((?i)"+palabraClave+"(?-i))\W*"
        Query query = new Query(); // Crear objeto de condición
        query.addCriteria(Criteria.where("description").regex(".*\\b"+palabraClave+"\\b.*","i"));
        List<Accessory> listaAccesorio = mongoTemplate.find(query,Accessory.class);
        return listaAccesorio;
    }
    
}
