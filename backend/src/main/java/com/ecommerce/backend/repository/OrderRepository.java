package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.domain.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>, OrderRepositoryCustom {
    @Query(value = "select sum(o.total_price) from orderbill o " +
            "where YEAR(o.order_date) = :years and MONTH(o.order_date) = :months", nativeQuery = true)
    Integer totalPriceInMonth(@Param("years") int years, @Param("months") int months);

    @Query(value = "select sum(o.total_price) from orderbill o where o.store_id = :storeId", nativeQuery = true)
    Integer calculateTotalPriceStore(@Param("storeId") Integer storeId);

    Page<Order> findAllByUser(User user, Pageable pageable);
}
