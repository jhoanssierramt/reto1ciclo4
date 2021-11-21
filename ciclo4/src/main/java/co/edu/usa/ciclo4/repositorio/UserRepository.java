/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.repositorio;

import co.edu.usa.ciclo4.modelo.User;
import co.edu.usa.ciclo4.repositorio.crud.UserCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Grupo G9 Cilco-4
 */
@Repository
public class UserRepository {

    @Autowired
    private UserCrudRepository crud;

    public List<User> getAll() {
        return (List<User>) crud.findAll();
    }

    public Optional<User> getUser(int id) {
        return crud.findById(id);
    }

    public User save(User usuario) {
        return crud.save(usuario);
    }

    public String getByEmail(String correo) {
        return crud.getByEmail(correo);
    }

    public Optional<User> checkEmailAndPassw(String email, String password) {
        return crud.checkEmailAndPassw(email, password);

    }

}
