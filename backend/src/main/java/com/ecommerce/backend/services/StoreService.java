package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.CountEmployee;
import com.ecommerce.backend.domain.payload.request.StoreRequest;
import com.ecommerce.backend.domain.payload.response.EmployeesResponse;
import com.ecommerce.backend.domain.payload.response.StoreProductRatio;
import com.ecommerce.backend.domain.payload.response.StoreWithEmployeesRes;
import com.ecommerce.backend.domain.payload.response.TimeWorkResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface StoreService {
    void createStore(StoreRequest storeRequest);
    Page<StoreRequest> getAll(Integer page, Integer pageSize);
    void deleteStore(Integer id);
    ResponseEntity<StoreRequest> findByName(String name);
    ResponseEntity<StoreRequest> getById(Integer id);
    ResponseEntity<CountEmployee> countStore();
    //lấy ra danh sách thông tin nhân viên
    Page<StoreWithEmployeesRes> getALlEmployeesStore(Integer page, Integer pageSize);

    //tính tỉ lệ sản phẩm bán ra của cửa hàng
    Page<StoreProductRatio> getStoreProductRatio(Integer page, Integer pageSize);

    //thời gian làm việc của nhân viên
    ResponseEntity<Page<TimeWorkResponse>> getTimeWorkEmployees(Integer page, Integer pageSize);

}
