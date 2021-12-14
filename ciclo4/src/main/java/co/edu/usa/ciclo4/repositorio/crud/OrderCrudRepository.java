package co.edu.usa.ciclo4.repositorio.crud;


import org.springframework.data.mongodb.repository.MongoRepository;

import co.edu.usa.ciclo4.modelo.Order;
import java.util.List;
import org.springframework.data.mongodb.repository.Query;

/**
 *
 * @author Brayan Garcia
 */

public interface OrderCrudRepository extends MongoRepository<Order, Integer>{
    //@Query("{salesMan:?0}")
    //public List<Order> getOrderBySalesMan(Integer id);
}
