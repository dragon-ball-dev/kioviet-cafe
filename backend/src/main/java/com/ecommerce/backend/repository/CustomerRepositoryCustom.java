package com.ecommerce.backend.repository;

import com.ecommerce.backend.domain.models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomerRepositoryCustom {
    Page<Customer> searchingAllCustomer(Pageable pageable, String keyword);
}
