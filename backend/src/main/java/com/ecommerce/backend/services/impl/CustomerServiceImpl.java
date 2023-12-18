package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Customer;
import com.ecommerce.backend.domain.payload.response.CustomerResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.CustomerRepository;
import com.ecommerce.backend.services.CustomerService;
import com.ecommerce.backend.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final MapperUtils mapperUtils;

    @Override
    public Page<CustomerResponse> getPageAllCustomer(Integer pageNo, Integer pageSize, String keyword) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(customerRepository.searchingAllCustomer(pageable, keyword), CustomerResponse.class, pageable);
    }

    @Override
    public CustomerResponse addNewCustomer(CustomerResponse customerResponse) {
        Customer customer = mapperUtils.convertToEntity(customerResponse, Customer.class);
        customerRepository.save(customer);
        return customerResponse;
    }

    @Override
    public String deleteCustomer(Long id) {
        customerRepository.deleteById(id);
        return "Xóa khách hàng có id " + id + " thành công";
    }

    @Override
    public CustomerResponse editCustomer(Long id, CustomerResponse customerResponse) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new BadRequestException("Customer don't exist"));
        customer.setName(customerResponse.getName());
        customer.setAddress(customerResponse.getAddress());
        customer.setPhone(customerResponse.getPhone());
        customer.setDiscount(customerResponse.getDiscount());
        customerRepository.save(customer);
        return customerResponse;
    }

    @Override
    public CustomerResponse getCustomerById(Long id) {
        return mapperUtils.convertToResponse(customerRepository.findById(id).orElseThrow(() -> new BadRequestException("Khách hàng không tồn tại"))
        , CustomerResponse.class);
    }


}
