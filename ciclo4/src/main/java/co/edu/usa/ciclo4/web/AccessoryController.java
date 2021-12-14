/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.web;

import co.edu.usa.ciclo4.modelo.Accessory;
import co.edu.usa.ciclo4.servicio.AccessoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author HeerJHobby
 */

@RestController
@RequestMapping("/api/accessory")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AccessoryController {
    /**
     * Variable que representa el servicio de Usuario
     */
    @Autowired
    private AccessoryService servicio;

    /**
     * Método para obtener el listado de Accesorios existentes
     *
     * @return listado de Accesorios formato JSON
     */
    @GetMapping("/all")
    public List<Accessory> getAccessorys() {
        return servicio.getAll();
    }

    /**
     * Método para crear un Accesorio
     *
     * @param accesorio
     * @return Usuario
     * @paramid identificador de Referencia
     *
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Accessory save(@RequestBody Accessory accesorio) {
        return servicio.save(accesorio);
    }
    /**
     * Método para Actualizar un Accesorio
     *
     * @param accesorio
     * @return Accesorio
     * @paramid identificador de Referencia
     *
     */
    
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Accessory update(@RequestBody Accessory accesorio) {
        return servicio.updateAccessory(accesorio);
    }
    
    /**
     * Método para Eliminar un Accesorio
     *
     * @param accesorioRef
     * @paramid identificador de Referencia
     *
     */
    
    @DeleteMapping("/{ref}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("ref") String accesorioRef) {
        return servicio.deleteAccessory(accesorioRef);
    }
    
    
    @GetMapping("/{ref}")
    public Accessory getAccessoryByRef(@PathVariable("ref") String referencia) {
        return servicio.getAccessory(referencia).orElse(new Accessory());
    }
    
    /**
     * Metodo encargado de retornar la orden que coincida con el id del Vendedor,
     * que se envia en URL
     * 
     * @param price
     * @return
     */
    @GetMapping("/price/{price}")
    public List<Accessory> getProductByPrice(@PathVariable("price") Double price) {
        System.out.println("Price: "+price);
        List<Accessory> listaProductos = servicio.getProductByPrice(price);
        System.out.println(listaProductos.toString());
        return listaProductos;
    }
    
    /**
     * Metodo encargado de retornar los productos que coincidan con la palabra 
     * clave de la descripción dada
     * 
     * @param palabraClave
     * @return
     */
    @GetMapping("/description/{palabraClave}")
    public List<Accessory> getProductsByDescription(@PathVariable("palabraClave") String palabraClave) {
        System.out.println("Palabra Clave Descripción: "+palabraClave);
        List<Accessory> listaProductos = servicio.getProductsByDescription(palabraClave);
        System.out.println(listaProductos.toString());
        return listaProductos;
    }
}
