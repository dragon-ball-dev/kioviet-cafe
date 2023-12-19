package com.ecommerce.backend.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Supply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String phone;
    private String email;
    private String address;

    @OneToMany(mappedBy = "supply")
    @JsonManagedReference(value = "supply")
    List<SupplyProduct> supplyProduct;

    @OneToMany(mappedBy = "supply")
    @JsonIgnore
    @JsonManagedReference
    private List<Cart> cart;
}
