/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo4.modelo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
//import org.springframework.data.mongodb.core.mapping.Field;

@Document (collection = "footwears")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
public class Accessory {
    
    @Id
    //@Field(name= "footwears_reference")
    private String reference;

    @NonNull
    //@Field(name= "footwears_brand")
    private String brand;

    @NonNull
    //@Field(name= "footwears_category")
    private String category;
    
    @NonNull
    //@Field(name= "footwears_material")
    private String material;

    @NonNull
    //@Field(name= "footwears_gender")
    private String gender;

    @NonNull
    //@Field(name= "footwears_size")
    private String size;

    @NonNull
    //@Field(name= "footwears_description")
    private String description;

    @NonNull
    //@Field(name= "footwears_availability")
    private Boolean availability = true;

    @NonNull
    //@Field(name= "footwears_price")
    private Double price;

    @NonNull
    //@Field(name= "footwears_quantity")
    private Integer quantity;

    @NonNull
    //@Field(name= "footwears_photography")
    private String photography;
}

