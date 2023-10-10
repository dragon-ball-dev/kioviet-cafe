package com.ecommerce.backend.domain.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer price;
    private String description;
    private Integer totalQuantity;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<SupplyProduct> supplyProduct;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<ProductMedia> productMedia;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<Inventory> inventory;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<OrderItem> orderItem;
}