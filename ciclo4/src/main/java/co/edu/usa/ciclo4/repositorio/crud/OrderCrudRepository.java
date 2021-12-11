package co.edu.usa.ciclo4.repositorio.crud;


import org.springframework.data.mongodb.repository.MongoRepository;

import co.edu.usa.ciclo4.modelo.Order;

/**
 *
 * @author Brayan Garcia
 */

public interface OrderCrudRepository extends MongoRepository<Order, Integer>{
    
}
