package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.response.CustomerResponse;
import com.ecommerce.backend.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController extends BaseController {

    private final CustomerService customerService;

    @GetMapping
    private ResponseEntity<?> getPageAllCustomer(@RequestParam Integer pageNo, @RequestParam Integer pageSize, @RequestParam String keyword){
        return createSuccessResponse(customerService.getPageAllCustomer(pageNo, pageSize, keyword));
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getCustomerById(@PathVariable Long id){
        return createSuccessResponse(customerService.getCustomerById(id));
    }

    @PostMapping
    private ResponseEntity<?> addCustomer(@RequestBody CustomerResponse customerResponse){
        return createSuccessResponse(customerService.addNewCustomer(customerResponse));
    }

    @PutMapping("/{id}")
    private ResponseEntity<?> editCustomer(@PathVariable Long id, @RequestBody CustomerResponse customerResponse){
        return createSuccessResponse(customerService.editCustomer(id, customerResponse));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        return createSuccessResponse(customerService.deleteCustomer(id));
    }
}
