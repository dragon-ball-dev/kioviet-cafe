package com.ecommerce.backend.repository;


import com.ecommerce.backend.domain.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepositoryCustom {
    Page<User> searchingAccount(String keyword, Pageable pageable);

    void deleteRoleOfAccount(Long id);
}
