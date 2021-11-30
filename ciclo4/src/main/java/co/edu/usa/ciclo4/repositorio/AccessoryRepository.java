/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.repositorio;

import co.edu.usa.ciclo4.modelo.Accessory;
import co.edu.usa.ciclo4.repositorio.crud.AccessoryCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author HeerJHobby
 */
@Repository
public class AccessoryRepository {

    @Autowired
    private AccessoryCrudRepository crud;

    public List<Accessory> getAll() {
        return (List<Accessory>) crud.findAll();
    }

    public Optional<Accessory> getAccessory(String id) {
        return crud.findById(id);
    }

    public Accessory save(Accessory accesorio) {
        return crud.save(accesorio);
    }
    /*
    public Optional<Accessory> getByReference(String referencia) {
        return crud.getAccessoryByReference(referencia);
    }
    */
    public void delete(Accessory accesorio){
        crud.delete(accesorio);
    }
    
}
