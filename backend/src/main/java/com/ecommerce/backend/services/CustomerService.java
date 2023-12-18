package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.response.CustomerResponse;
import org.springframework.data.domain.Page;

public interface CustomerService {
    Page<CustomerResponse> getPageAllCustomer(Integer pageNo, Integer pageSize, String keyword);

    CustomerResponse addNewCustomer(CustomerResponse customerResponse);

    String deleteCustomer(Long id);

    CustomerResponse editCustomer(Long id, CustomerResponse customerResponse);

    CustomerResponse getCustomerById(Long id);
}
