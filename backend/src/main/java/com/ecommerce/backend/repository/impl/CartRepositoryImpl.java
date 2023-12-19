package com.ecommerce.backend.repository.impl;

import com.ecommerce.backend.domain.models.Cart;
import com.ecommerce.backend.domain.models.Customer;
import com.ecommerce.backend.repository.BaseRepository;
import com.ecommerce.backend.repository.CartRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Repository
public class CartRepositoryImpl implements CartRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Cart> findAllByUser(Long userId, Pageable pageable) {
        StringBuilder strQuery = new StringBuilder();
        strQuery.append( " from cart c where 1=1 ");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(userId)) {
            strQuery.append(" AND c.user_id = :userId  ");
            params.put("userId", userId);
        }
        String selectQuery = "select * " + strQuery;
        String strCountQuery = "SELECT COUNT(DISTINCT c.id)" + strQuery;


        return BaseRepository.getPagedNativeQuery(em,selectQuery, strCountQuery, params, pageable, Cart.class);
    }
}
