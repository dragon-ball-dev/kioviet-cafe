package com.ecommerce.backend.repository.impl;

import com.ecommerce.backend.domain.enums.RoleName;
import com.ecommerce.backend.domain.models.Order;
import com.ecommerce.backend.repository.OrderRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {

    @PersistenceContext
    private EntityManager em;


    @Override
    public Page<Order> searchingByUserId(Long userId, RoleName roleName, Pageable pageable) {

        return null;
    }
}
