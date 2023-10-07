package com.ecommerce.backend.repository;



import com.ecommerce.backend.domain.enums.RoleName;
import com.ecommerce.backend.domain.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
