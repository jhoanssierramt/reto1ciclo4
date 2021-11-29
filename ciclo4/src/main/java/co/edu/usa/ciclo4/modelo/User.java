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

import java.util.Date;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

//@Entity
//@Table(name = "user",uniqueConstraints=@UniqueConstraint(columnNames={"email"}))
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter 
@Getter

@Document (collection = "users")
public class User {
    
    @Id
    private String id;
    
    @NonNull
    @Field(name= "user_identification")
    private String identification;
    
    @NonNull
    @Field(name= "user_name")
    private String name;
    
    @NonNull
    @Field(name= "user_address")
    private String address;
    
    @NonNull
    @Field(name= "user_cellPhone")
    private String cellPhone;

    @NonNull
    @Field(name= "user_email")
    private String email;
    
    @NonNull
    @Field(name= "user_password")
    private String password;
    
    @NonNull
    @Field(name= "user_zone")
    private String zone;
    
    @NonNull
    @Field(name= "user_type")
    private String type;
   
    
}