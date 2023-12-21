package com.ecommerce.backend.repository.impl;

import com.ecommerce.backend.domain.enums.RoleName;
import com.ecommerce.backend.domain.models.Customer;
import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.repository.BaseRepository;
import com.ecommerce.backend.repository.OrderRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Repository
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {

    @PersistenceContext
    private EntityManager em;


    @Override
    public Page<Order> searchingByUserId(Long userId, Integer storeId, Integer supplyId, Pageable pageable) {
        StringBuilder strQuery = new StringBuilder();
        strQuery.append( " from kiotviet.`order` o  left join order_item oi on o.id = oi.order_id  where 1=1 ");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(userId)) {
            strQuery.append(" and o.user_id = :userId  ");
            params.put("userId", userId);
        }

        if (Objects.nonNull(storeId)) {
            strQuery.append("  and o.store_id = :storeId   ");
            params.put("store", storeId);
        }

        if (Objects.nonNull(supplyId)) {
            strQuery.append(" and oi.supply_id = :supplyId  ");
            params.put("supplyId", supplyId);
        }
        String selectQuery = "select * " + strQuery + " group by oi.supply_id ";
        String strCountQuery = "SELECT COUNT(DISTINCT o.id)" + strQuery + " group by oi.supply_id ";


        return BaseRepository.getPagedNativeQuery(em,selectQuery, strCountQuery, params, pageable, Order.class);
    }
}
