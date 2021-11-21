/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.web;

import co.edu.usa.ciclo4.modelo.User;
import co.edu.usa.ciclo4.servicio.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Clase Controller User
 *
 * @version 1.0
 * @author Sierra Rojas Trejos Garcia Herrera
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class UserController {

    /**
     * Variable que representa el servicio de Usuario
     */
    @Autowired
    private UserService servicio;

    /**
     * Método para obtener el listado de Usuarios existentes
     *
     * @return listado de Usuarios formato JSON
     */
    @GetMapping("/all")
    public List<User> getUsers() {
        return servicio.getAll();
    }

    /**
     * Método para crear una Usuario
     *
     * @param usuario
     * @return Usuario
     * @paramid identificador de Usuario
     *
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User usuario) {
        return servicio.save(usuario);
    }

    /**
     * Método para Consultar un Email
     *
     * @param email Consultado
     * @return Usuario en formato JSON
     */
    @GetMapping("/{email}")
    public String getUsersByEmail(@PathVariable("email") String email) {
        return servicio.getByEmail(email);
    }

    /**
     * Método para Consultar un email y password Usuario
     *
     * @param email
     * @param password
     * @return Usuario y datos en formato JSON
     */
    @GetMapping("/{email}/{pass}")
    public User checkEmailAndPassw(@PathVariable("email") String email, @PathVariable("pass") String password) {
        return servicio.checkEmailAndPassw(email, password);
    }
}
