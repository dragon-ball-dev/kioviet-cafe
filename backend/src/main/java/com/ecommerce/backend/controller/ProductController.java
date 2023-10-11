package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.payload.request.ProductRequest;
import com.ecommerce.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/product")
public class ProductController extends BaseController {
    @Autowired
    ProductService productService;
    @PostMapping("/create-product")
    public ResponseEntity<?> createProduct( @RequestParam("name") String name,
                                            @RequestParam("price") Integer price,
                                            @RequestParam("description") String description,
                                            @RequestParam("categoryId") Integer categoryId,
                                            @RequestParam("totalQuantity") Integer totalQuantity,
                                            @RequestParam("file")MultipartFile file) throws IOException {
        productService.createProduct(name, price, description, categoryId, totalQuantity, file);
        return createSuccessResponse("create product", "thêm thành công");
    }

    @PostMapping("/create-img")
    public ResponseEntity<?> createImgProduct(@RequestParam("id") Integer id, @RequestParam("file") MultipartFile file) {
        productService.createImgProduct(id, file);
        return createSuccessResponse("create image", "thêm thành công");
    }
    @PatchMapping("/change-product")
    public ResponseEntity<?> changeProduct(@RequestParam Integer id, @RequestBody ProductRequest productRequest) {
        productService.changeProduct(id, productRequest);
        return createSuccessResponse("change product", "thay đổi thành công");
    }
}
