/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.servicio;

import co.edu.usa.ciclo4.modelo.User;
import co.edu.usa.ciclo4.repositorio.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Clase Controller User
 * Grupo G9 - G2
 * @version 4.0
 * @author Sierra Rojas Trejos Garcia Herrera
 */
@Service
public class UserService {

    /**
     * Variable que representa el servicio de Usuario
     */
    @Autowired
    private UserRepository metodosCrud;

    /**
     * Método para Consultar Lista de Usuarios
     *
     * @return LIsta Usuarios
     */
    public List<User> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Método para Consultar Usuario por Id
     *
     * @return Id Usuario
     */
    public Optional<User> getUser(Integer usuarioId) {
        return metodosCrud.getUser(usuarioId);
    }
    /**
     * Método para Guardar un Usuario
     *
     * @return Usuario
     */
    public User save(User usuario) {
        if (usuario.getId() == null) {
            return usuario;
        } else {
            Optional<User> opUser = metodosCrud.getUser(usuario.getId());
            if (!opUser.isPresent()) {
                if("false".equals(getByEmail(usuario.getEmail()))){
                    return metodosCrud.save(usuario);
                } else {
                    return usuario;
                }
            } else {
                return usuario;
            }

        }
      
    }
    /**
     * Método para Consultar por correo
     *
     * @return correo
     */

    public String getByEmail(String correo) {
        String aux = metodosCrud.getByEmail(correo);
        if (aux == null) {
            return "false";
        } else {
            return "true";
        }
    }

    /**
     * Método para Consultar Usuario por correo y password
     *
     * @return Nuevo Usuario
     */

    public User checkEmailAndPassw(String email, String password) {

        Optional<User> usuario = metodosCrud.checkEmailAndPassw(email, password);
        User userNew = new User();

        if (usuario.isPresent()) {
            userNew = usuario.orElse(userNew);
        }
        //System.out.println("userNew:" + userNew.getEmail());
        return userNew;

    }

    /**
     * Método para Actualizar Usuario
     *
     * @return Usuario
     */

    public User updateUser(User usuario) {
        if (usuario.getId() != null) {
            Optional<User> userNew = metodosCrud.getUser(usuario.getId());
            if (userNew.isPresent()) {
                // Al usar la Anotacion @NotNull no es necesario hacer estas validaciones
                // if (usuario.getIdentification() != null) 
                userNew.get().setIdentification(usuario.getIdentification());
                
                userNew.get().setName(usuario.getName());

                userNew.get().setAddress(usuario.getAddress());

                userNew.get().setCellPhone(usuario.getCellPhone());

                userNew.get().setEmail(usuario.getEmail());

                userNew.get().setPassword(usuario.getPassword());

                userNew.get().setZone(usuario.getZone());

                userNew.get().setType(usuario.getType());
                
                userNew.get().setBirthtDay(usuario.getBirthtDay());
                userNew.get().setMonthBirthtDay(usuario.getMonthBirthtDay());

                metodosCrud.save(userNew.get());
                return userNew.get();
            } else {
                return usuario;
            }
        } else {
            return usuario;
        }
    }
    /**
     * Método para Borrar Usuario 
     *
     * @return true False
     */
    public boolean deleteUser(Integer userId) {
        return getUser(userId).map(user -> {
            metodosCrud.delete(user);
            return true;
        }).orElse(false);
    } 
    /**
     * Método para Consultar Usuarios por Zona
     *
     * @return Usuarios por zona
     */
    
    public List<User> getUsersByZone (String zone){
        return metodosCrud.getUsersByZone(zone);
    }
    /**
     * Método para Consultar usuario por Fecha de Cumpleaños
     *
     * @return Mes de cumpleaños
     */
    public List<User> getUsersByBirthday(String mes){
        return metodosCrud.getUsersByBirthday(mes);
    }
}
