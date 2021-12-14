package co.edu.usa.ciclo4.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import co.edu.usa.ciclo4.modelo.Order;
import co.edu.usa.ciclo4.repositorio.crud.OrderCrudRepository;
import java.util.Date;

/**
 *
 * @author Brayan Garcia
 */

@Repository
public class OrderRepository {
    
    @Autowired
    private OrderCrudRepository crudOrder;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Order> traerOrdenes() {
        return crudOrder.findAll();
    }

    public Optional<Order> traerOrden(Integer id) {
        return crudOrder.findById(id);
    }

    public Order guardarOrden(Order orden) {
        return crudOrder.save(orden);
    }

    public List<Order> traerOrdenesPorZona(String zona){

        /**
         * tomado de https://programmerclick.com/article/60551643443/
         * lineas 40 a 44
         */

        Query query = new Query(); // Crear objeto de condición
        query.addCriteria(Criteria.where("salesMan.zone").is(zona));
        List<Order> ls = mongoTemplate.find(query,Order.class);
        return ls;
    }

    /**
     * No se necesita para el reto 3
     * @param orden
     */
    public void borrarOrden(Order orden){
        crudOrder.delete(orden);
    }
    
    public List<Order> getOrderBySalesMan(Integer id){
        //return crudOrder.getOrderBySalesMan(id);
        Query query = new Query(); // Crear objeto de condición
        query.addCriteria(Criteria.where("salesMan.id").is(id));
        List<Order> listaOrder = mongoTemplate.find(query,Order.class);
        return listaOrder;
    }
    
    public List<Order> getOrderByStatusAndBySalesMan(String status, Integer id){
        Query query = new Query(); // Crear objeto de condición
        query.addCriteria(Criteria.where("salesMan.id").is(id).and("status").is(status));
        List<Order> listaOrder = mongoTemplate.find(query,Order.class);
        return listaOrder;
    }
    
    public List<Order> getOrderByDateAndBySalesMan(Date date, Integer id){
        Query query = new Query(); // Crear objeto de condición
        query.addCriteria(Criteria.where("salesMan.id").is(id).and("registerDay").is(date));
        List<Order> listaOrder = mongoTemplate.find(query,Order.class);
        return listaOrder;
    }
}
