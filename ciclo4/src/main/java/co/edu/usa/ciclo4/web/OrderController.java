package co.edu.usa.ciclo4.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.edu.usa.ciclo4.modelo.Order;
import co.edu.usa.ciclo4.servicio.OrderService;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Clase Controller User
 *
 * @author Brayan Garcia
 */

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class OrderController {

     /**
     * Inyeccion de los servicios Orden
     */
    @Autowired
    private OrderService orderService;

    /**
     * Método para obtener el listado de Ordenes
     *
     * @return listado de ordenes formato JSON
     */
    @GetMapping("/all")
    public List<Order> getAll() {
        return orderService.getAllOrders();
    }

    /**
     * Metodo encargado de retornar la orden que coincida con el id,
     * que se envia en URL
     * 
     * @param idOrden
     * @return
     */
    @GetMapping("/{id}")
    public Order getOrderDetail(@PathVariable("id") Integer idOrden) {
        return orderService.getOrder(idOrden).orElse(new Order());
    }

    /**
     * Método para crear una orden
     *
     * @param orden
     *
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order save(@RequestBody Order orden) {
        return orderService.saveOrder(orden);
    }


    /**
     * Método para Actualizar una orden
     *
     * @param orden
     *
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order orden) {
        return orderService.updateOrder(orden);
    }
    
    /**
     * Listado de ordenes que pertenezcan a cierta zona
     */
    @GetMapping("/zona/{zona}")
    public List<Order> ordenesPorZona(@PathVariable("zona") String zona) {
        return orderService.getAllOrdersByZona(zona);
    }


    /**
     * Método para Eliminar una orden, no usado en reto 3
     *
     * @paramid identificador de orden
     *
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") Integer idOrden) {
        return orderService.deleteOrder(idOrden);
    }
    
}
