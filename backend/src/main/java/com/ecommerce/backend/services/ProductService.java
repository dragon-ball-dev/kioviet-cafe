package com.ecommerce.backend.services;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.payload.request.ProductRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    void createProduct(String name, Integer price, String description,Integer categoryId,
                                    Integer totalQuantity, MultipartFile multipartFile) throws IOException;

    //thêm ảnh cho product
    void createImgProduct(Integer id, MultipartFile file);
    //sửa thông tin sản phẩm
    void changeProduct(Integer id, ProductRequest productRequest);
}
