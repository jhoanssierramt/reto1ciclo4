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

    public Optional<User> getUser(Integer usuarioId) {
        return metodosCrud.getUser(usuarioId);
    }

    public User save(User usuario) {
        if (usuario.getId() == null) {
            return usuario;
        } else {
            Optional<User> e = metodosCrud.getUser(usuario.getId());
            if (!e.isPresent()) {
                if("false".equals(getByEmail(usuario.getEmail()))){
                    return metodosCrud.save(usuario);
                } else {
                    return usuario;
                }
            } else {
                return usuario;
            }

        }
        //return metodosCrud.save(usuario);
    }

    public String getByEmail(String correo) {
        String aux = metodosCrud.getByEmail(correo);
        if (aux == null) {
            return "false";
        } else {
            return "true";
        }
    }

    public User checkEmailAndPassw(String email, String password) {

        Optional<User> usuario = metodosCrud.checkEmailAndPassw(email, password);
        User userNew = new User();

        if (usuario.isPresent()) {
            userNew = usuario.orElse(userNew);
        }
        //System.out.println("userNew:" + userNew.getEmail());
        return userNew;

    }

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
    
    public boolean deleteUser(Integer userId) {
        Boolean aBoolean = getUser(userId).map(user -> {
            metodosCrud.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    } 
    
    public List<User> getUsersByZone (String zone){
        return metodosCrud.getUsersByZone(zone);
    }
}
