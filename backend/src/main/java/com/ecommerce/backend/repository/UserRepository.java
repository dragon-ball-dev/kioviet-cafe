package com.ecommerce.backend.repository;


import com.ecommerce.backend.domain.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> , UserRepositoryCustom{

    @Query(value = "Select * from kiotviet.users u where u.email = :email", nativeQuery = true)
    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    Boolean existsByEmail(String email);
    
    List<User> findByName(String name);

    long count();

    Page<User> findAllByStoreIsNotNull(Pageable pageable);

}
