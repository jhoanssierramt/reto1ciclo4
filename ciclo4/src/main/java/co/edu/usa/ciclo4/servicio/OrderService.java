package co.edu.usa.ciclo4.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.ciclo4.modelo.Order;
import co.edu.usa.ciclo4.repositorio.OrderRepository;
import java.util.Date;

/**
 *
 * @author Brayan Garcia
 */

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public List<Order> getAllOrders() {
        return orderRepository.traerOrdenes();
    }

    public Optional<Order> getOrder(Integer idOrden) {
        return orderRepository.traerOrden(idOrden);
    }

    public Order saveOrder(Order orden) {
        if (orden.getId() == null) {
            return orden;
        } else {
            Optional<Order> ord = orderRepository.traerOrden(orden.getId());
            if(!ord.isPresent()){
                return orderRepository.guardarOrden(orden);
            }else{
                Order ordenError = new Order();
                ordenError.setStatus("Error al crear orden");
                return ordenError;
            }
        }
    }

    public Order updateOrder(Order orden){

        Optional<Order> ord = orderRepository.traerOrden(orden.getId());
        if(ord.isPresent()){

            ord.get().setStatus(orden.getStatus());

            orderRepository.guardarOrden(ord.get());
            
            return ord.get();
        }else{
            return orden;
        }
    }

    public List<Order> getAllOrdersByZona(String zona){
        return orderRepository.traerOrdenesPorZona(zona);
    }

    
    public boolean deleteOrder(Integer idOrden){
        return true;
    }
    
    public List<Order> getOrderBySalesMan(Integer id){
        return orderRepository.getOrderBySalesMan(id);
    }
    
    public List<Order> getOrderByStatusAndBySalesMan(String status, Integer id){
        return orderRepository.getOrderByStatusAndBySalesMan(status, id);
    }
    
    public List<Order> getOrderByDateAndBySalesMan(Date date, Integer id){
        return orderRepository.getOrderByDateAndBySalesMan(date, id);
    }
}
