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
     * Método para obtener el listado de Usuarios existentes
     *
     * @return listado de Usuarios formato JSON
     */
    @GetMapping("/all")
    public List<Accessory> getAccessorys() {
        return servicio.getAll();
    }

    /**
     * Método para crear una Usuario
     *
     * @param accesorio
     * @return Usuario
     * @paramid identificador de Usuario
     *
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Accessory save(@RequestBody Accessory accesorio) {
        return servicio.save(accesorio);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Accessory update(@RequestBody Accessory accesorio) {
        return servicio.updateAccessory(accesorio);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") String accesorioRef) {
        return servicio.deleteAccessory(accesorioRef);
    }
}
