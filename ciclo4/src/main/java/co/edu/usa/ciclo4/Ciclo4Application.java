package co.edu.usa.ciclo4;

import co.edu.usa.ciclo4.modelo.Accessory;
import co.edu.usa.ciclo4.modelo.Order;
import co.edu.usa.ciclo4.modelo.User;
import co.edu.usa.ciclo4.repositorio.AccessoryRepository;
import co.edu.usa.ciclo4.repositorio.OrderRepository;
import co.edu.usa.ciclo4.repositorio.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"co.edu.usa.ciclo4"})
public class Ciclo4Application {

    @Autowired
    private UserRepository repoUser;
    @Autowired
    private AccessoryRepository repoAccessory;
    @Autowired
    private OrderRepository repoOrder;

    public static void main(String[] args) {
        SpringApplication.run(Ciclo4Application.class, args);
    }

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            List<User> listaUsuarios = repoUser.getAll();
            System.out.println("Users: " + listaUsuarios.size());

            List<Accessory> listaAccesorios = repoAccessory.getAll();
            System.out.println("Accesories: " + listaAccesorios.size());
            
            List<Order> listaOrden = repoOrder.traerOrdenes();
            System.out.println("Orders: " + listaOrden.size());
        };
    }
}
