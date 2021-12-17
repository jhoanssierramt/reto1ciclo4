/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.repositorio.crud;

import co.edu.usa.ciclo4.modelo.Accessory;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 *
 * @author HeerJHobby
 */
public interface AccessoryCrudRepository extends MongoRepository<Accessory, String>{
    @Query("{price : {$lte :?0 }}")
    public List<Accessory> getAccessoryByPrice(Double price);   
}
