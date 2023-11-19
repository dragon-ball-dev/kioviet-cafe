package com.ecommerce.backend.domain.payload.response;

import lombok.Data;

import java.util.List;
@Data
public class StoreWithEmployeesRes {
    private Integer storeId;
    private String storeName;
    private List<EmployeesResponse> employeesResponses;

    public StoreWithEmployeesRes(Integer storeId, String storeName, List<EmployeesResponse> employeesResponses) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.employeesResponses = employeesResponses;
    }
}
