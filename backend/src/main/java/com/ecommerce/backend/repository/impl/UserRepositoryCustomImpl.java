package com.ecommerce.backend.repository.impl;


import com.ecommerce.backend.domain.models.User;
import com.ecommerce.backend.repository.BaseRepository;
import com.ecommerce.backend.repository.UserRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Repository
@Transactional
public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    private static final String FROM_USER = "from users u ";
    @Override
    public Page<User> searchingAccount(String keyword, Pageable pageable) {
        StringBuilder strQuery = new StringBuilder();
        strQuery.append(FROM_USER);
        strQuery.append(" where 1=1 AND u.email NOT IN ('admin@gmail.com') ");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(keyword) && !keyword.isEmpty()) {
            strQuery.append(" AND (u.name LIKE :keyword OR u.email LIKE :keyword)  ");
            params.put("keyword", "%"+keyword+"%");
        }

        String strSelectQuery = "SELECT * " + strQuery;

        String strCountQuery = "SELECT COUNT(DISTINCT u.id)" + strQuery;

        return BaseRepository.getPagedNativeQuery(em,strSelectQuery, strCountQuery, params, pageable, User.class);
    }

    @Override
    public void deleteRoleOfAccount(Long userId) {
        String queryString = "DELETE FROM user_roles WHERE user_id = :userId ";
        Query nativeQuery = em.createNativeQuery(queryString);
        nativeQuery.setParameter("userId", userId);
        nativeQuery.executeUpdate();
    }
}
