package com.ecommerce.backend.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name = "is_stock")
    private Boolean isStock;

    @JsonIgnore
    @OneToMany(mappedBy = "store")
    @JsonManagedReference
    private List<Inventory> inventory;


    @JsonIgnore
    @OneToMany(mappedBy = "store")
    @JsonManagedReference
    List<Order> order;

    @JsonIgnore
    @OneToMany(mappedBy = "store")
    @JsonManagedReference
    private List<User> user;

    @OneToMany(mappedBy = "store")
    @JsonIgnore
    @JsonManagedReference
    private List<Cart> cart;
}
