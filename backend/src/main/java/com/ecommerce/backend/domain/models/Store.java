package com.ecommerce.backend.domain.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String address;
    private String phone;
    private String email;

    @OneToMany(mappedBy = "store")
    @JsonManagedReference
    private List<Inventory> inventory;

    @OneToMany(mappedBy = "store")
    @JsonManagedReference
    List<OrderItem> orderItem;

    @OneToMany(mappedBy = "store")
    @JsonManagedReference
    List<Order> order;

    @OneToMany(mappedBy = "store")
    @JsonManagedReference
    private List<User> user;
}
