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
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 * Clase Controller User Grupo G9 - G2
 *
 * @version 4.0
 * @author Sierra Rojas Trejos Garcia Herrera
 */
@Repository
public class UserRepository {

    /**
     * Variable que representa el repo-CRUD de Usuario
     */
    @Autowired
    private UserCrudRepository crud;
    /**
     * Variable que representa el template de mongoDB
     */
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * Método para Consultar Lista de Usuarios
     *
     * @return LIsta Usuarios
     */
    public List<User> getAll() {
        return (List<User>) crud.findAll();
    }

    /**
     * Método para Consultar Usuario por Id
     *
     * @param idUser
     * @return Id Usuario
     */
    public Optional<User> getUser(Integer idUser) {
        return crud.findById(idUser);
    }

    /**
     * Método para Guardar un Usuario
     *
     * @param usuario
     * @return Usuario
     */
    public User save(User usuario) {
        return crud.save(usuario);
    }

    /**
     * Método para Consultar por correo
     *
     * @param correo
     * @return correo
     */
    public String getByEmail(String correo) {
        return crud.getUserByEmail(correo);
    }

    /**
     * Método para Consultar Usuario por correo y password
     *
     * @param email
     * @param password
     * @return Nuevo Usuario
     */
    public Optional<User> checkEmailAndPassw(String email, String password) {
        return crud.getUserByEmailAndPassword(email, password);
    }

    /**
     * Método para Borrar Usuario
     *
     * @param user
     */
    public void delete(User user) {
        crud.delete(user);
    }

    /**
     * Método para Consultar Usuarios por Zona
     *
     * @param zone
     * @return Usuarios por zona
     */
    public List<User> getUsersByZone(String zone) {
        return crud.getUsersByZone(zone);
    }

    /**
     * Método para Consultar usuario por Fecha de Cumpleaños
     *
     * @param monthBirth
     * @return Mes de cumpleaños
     */
    public List<User> getUsersByBirthday(String monthBirth) {
        Query query = new Query(); // Crear objeto de condición
        query.addCriteria(Criteria.where("monthBirthtDay").is(monthBirth));
        return mongoTemplate.find(query, User.class);
    }
}
