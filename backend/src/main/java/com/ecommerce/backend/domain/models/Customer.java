package com.ecommerce.backend.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    private String address;
    private Integer discount;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @JsonManagedReference
    private List<Cart> cart;

    public Customer(String name, String phone, String address, Integer discount) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.discount = discount;
    }
}
