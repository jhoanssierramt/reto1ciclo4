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
@Setter @Getter

@Document (collection = "usuarios")
public class User {
    
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(length = 11,nullable = false)
    private String id;
    
    //@Column(length = 50,nullable = false)
    @NonNull
    @Field(name= "user_email")
    private String email;
    
    //@Column(length = 50, nullable = false)
    @NonNull
    @Field(name= "user_password")
    private String password;
    
    //@Column(length = 80,nullable = false)
    @NonNull
    @Field(name= "user_name")
    private String name;
    /*
    @Id
    private String id;

    private String identification;

    private String name;

    private Date birthtDay;

    private String monthBirthtDay;

    private String address;

    private String cellPhone;

    private String email;

    private String password;

    private String zone;

    private String type;
    */
    public String getId() {
        return id;
    }
}