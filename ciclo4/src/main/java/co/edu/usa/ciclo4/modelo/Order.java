package co.edu.usa.ciclo4.modelo;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

/**
 *
 * 
 * @author Grupo G9 Ciclo 4
 */

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class Order {

    public static String PENDING = "Pendiente";
    public static String APROVED = "Aprobada";
    public static String REJECTED = "Rechazada";

    @Id
    // @Field(name = "ORDER_ID")
    private Integer id;

    @NonNull
    // @Field(name = "REGISTER_DAY")
    private Date registerDay;

    @NonNull
    // @Field(name = "STATUS")
    private String status;

    @NonNull
    // @Field(name = "SALES_MAN")
    private User salesMan;

    @NonNull
    // @Field(name = "ORDER_PRODUCTS")
    private Map<String, Accessory> products;

    @NonNull
    // @Field(name = "ORDER_QUANTITIES")
    private Map<String, Integer> quantities;
    
}
