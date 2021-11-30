/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.modelo;

/**
 *
 * 
 * @author Grupo G9 Cilco-4
 */

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Entity
//@Table(name = "user",uniqueConstraints=@UniqueConstraint(columnNames={"email"}))
@Document (collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
public class User {
    @Id
    private Integer id;
    
    @NonNull
    //@Field(name= "user_identification")
    private String identification;
    
    @NonNull
    //@Field(name= "user_name")
    private String name;
    
    @NonNull
    //@Field(name= "user_address")
    private String address;
    
    @NonNull
    //@Field(name= "user_cellPhone")
    private String cellPhone;

    @NonNull
    //@Field(name= "user_email")
    private String email;
    
    @NonNull
    //@Field(name= "user_password")
    private String password;
    
    @NonNull
    //@Field(name= "user_zone")
    private String zone;
    
    @NonNull
    //@Field(name= "user_type")
    private String type;
}