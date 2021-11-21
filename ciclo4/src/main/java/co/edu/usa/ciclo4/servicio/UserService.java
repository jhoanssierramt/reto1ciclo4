/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.servicio;

import co.edu.usa.ciclo4.modelo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.edu.usa.ciclo4.repositorio.*;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author HeerJHobby
 */
@Service
public class UserService {
    
    @Autowired
    private UserRepository metodosCrud;
    
    public List<User> getAll() {
        return metodosCrud.getAll();
    }
    
    public Optional<User> getUser(int usuarioId) {
        return metodosCrud.getUser(usuarioId);
    }
    
    public User save(User usuario) {
        if (usuario.getId() == null) {
            return metodosCrud.save(usuario);
        } else {
            Optional<User> e = metodosCrud.getUser(usuario.getId());
            if (e.isPresent()) {
                return metodosCrud.save(usuario);
            } else {
                return usuario;
            }
            
        }
    }
    
    public String getByEmail(String correo) {
        return metodosCrud.getByEmail(correo);
    }
    
    public User checkEmailAndPassw(String email, String password) {
        Optional<User> usuario = metodosCrud.checkEmailAndPassw(email, password);
        User userNew = new User();
        if (!usuario.isPresent()) {
            
            userNew.setEmail(email);
            userNew.setPassword(password);
            userNew.setName("NO DEFINIDO");
        } else {
            userNew = usuario.orElse(userNew);
        }
        System.out.println("userNew:"+ userNew.getEmail());
        return userNew;
    }
}
