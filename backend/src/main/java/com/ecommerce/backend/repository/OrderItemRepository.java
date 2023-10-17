package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.OrderItem;
import com.ecommerce.backend.domain.payload.request.BestSeller;
import com.ecommerce.backend.domain.payload.request.ProductRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Query(value = "select sum(i.quantity) as kq, i.product_id from order_item i " +
            "group by i.product_id order by kq desc limit 1", nativeQuery = true)
    Object bestSellerProduct();
}
