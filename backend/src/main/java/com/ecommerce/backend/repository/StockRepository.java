package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.models.Stock;
import com.ecommerce.backend.domain.models.Supply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> , StockRepositoryCustom{
    Stock findByProduct(Product product);

    Stock findByProductAndSupply(Product product, Supply supply);
}
