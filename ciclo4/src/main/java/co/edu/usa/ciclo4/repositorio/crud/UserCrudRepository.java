/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.repositorio.crud;

import co.edu.usa.ciclo4.modelo.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Grupo G9 Cilco-4
 */
public interface UserCrudRepository extends CrudRepository<User,Integer>{
 
  @Query(value = "SELECT IF (exists (SELECT true  FROM  user WHERE email like ? ),'true', 'false' ) AS Result",nativeQuery=true)
  public String getByEmail(String email);
  
  @Query(value = "select * from user us where us.email like ?1 and us.password like ?2",nativeQuery=true)
  public Optional<User> checkEmailAndPassw(String email, String password);
}