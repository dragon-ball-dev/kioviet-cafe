package com.ecommerce.backend.repository.impl;

import com.ecommerce.backend.domain.models.Customer;
import com.ecommerce.backend.repository.BaseRepository;
import com.ecommerce.backend.repository.CustomerRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Repository
public class CustomerRepositoryCustomImpl implements CustomerRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Customer> searchingAllCustomer(Pageable pageable, String keyword) {
        StringBuilder strQuery = new StringBuilder();
        strQuery.append( " from customer c where 1=1 ");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(keyword) && !keyword.isEmpty()) {
            strQuery.append(" AND c.name LIKE :keyword  ");
            params.put("keyword", "%"+keyword+"%");
        }
        String selectQuery = "select * " + strQuery;
        String strCountQuery = "SELECT COUNT(DISTINCT c.id)" + strQuery;


        return BaseRepository.getPagedNativeQuery(em,selectQuery, strCountQuery, params, pageable, Customer.class);
    }
}
