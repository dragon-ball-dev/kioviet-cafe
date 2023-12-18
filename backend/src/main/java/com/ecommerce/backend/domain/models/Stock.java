package com.ecommerce.backend.domain.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "stock")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @ManyToOne
    @JoinColumn(name = "supply_id")
    private Supply supply;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    private String address;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Double quantity;

    public Stock(String name, Supply supply, Store store, String address, Product product, Double quantity) {
        this.name = name;
        this.supply = supply;
        this.store = store;
        this.address = address;
        this.product = product;
        this.quantity = quantity;
    }
}
