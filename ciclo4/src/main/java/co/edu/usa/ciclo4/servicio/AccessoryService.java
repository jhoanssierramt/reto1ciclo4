/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.servicio;

import co.edu.usa.ciclo4.modelo.Accessory;
import co.edu.usa.ciclo4.repositorio.AccessoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author HeerJHobby
 */
@Service
public class AccessoryService {

    @Autowired
    private AccessoryRepository metodosCrud;

    //@Transactional (readOnly = true)
    public List<Accessory> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Accessory> getAccessory(String accesorioId) {
        return metodosCrud.getAccessory(accesorioId);
    }

    public Accessory save(Accessory accesorio) {
        if (accesorio.getReference() == null) {
            return accesorio;
        } else {
            Optional<Accessory> e = metodosCrud.getAccessory(accesorio.getReference());
            if (!e.isPresent()) {
                return metodosCrud.save(accesorio);
            } else {
                return accesorio;
            }
        }
    }

    /*
    public Optional<Accessory> getByReference(String referencia) {
        return metodosCrud.getByReference(referencia);
    }
     */

    public Accessory updateAccessory(Accessory accesorio) {
        Optional<Accessory> accessoryNew = metodosCrud.getAccessory(accesorio.getReference());
        if (accessoryNew.isPresent()) {

            accessoryNew.get().setBrand(accesorio.getBrand());

            accessoryNew.get().setCategory(accesorio.getCategory());

            accessoryNew.get().setMaterial(accesorio.getMaterial());

            accessoryNew.get().setGender(accesorio.getGender());

            accessoryNew.get().setSize(accesorio.getSize());

            accessoryNew.get().setDescription(accesorio.getDescription());

            accessoryNew.get().setAvailability(accesorio.getAvailability());

            accessoryNew.get().setPrice(accesorio.getPrice());

            accessoryNew.get().setQuantity(accesorio.getQuantity());

            accessoryNew.get().setPhotography(accesorio.getPhotography());

            metodosCrud.save(accessoryNew.get());
            return accessoryNew.get();
        } else {
            return accesorio;
        }
    }

    public boolean deleteAccessory(String referencia) {
        Boolean aBoolean = getAccessory(referencia).map(accesorio -> {
            metodosCrud.delete(accesorio);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    public List<Accessory> getProductByPrice(Double price){
        return metodosCrud.getProductByPrice(price);
    }
    
    public List<Accessory> getProductsByDescription(String palabraClave){
        return metodosCrud.getProductsByDescription(palabraClave);
    }

}
