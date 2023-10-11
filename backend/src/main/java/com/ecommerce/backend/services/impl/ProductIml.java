package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Category;
import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.models.ProductMedia;
import com.ecommerce.backend.domain.payload.request.ProductRequest;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductMediaRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.services.FileStorageService;
import com.ecommerce.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Optional;

@Service
public class ProductIml implements ProductService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductMediaRepository productMediaRepository;
    @Autowired
    FileStorageService fileStorageService;
    @Override
    public void createProduct(String name, Integer price, String description,Integer categoryId,
                                           Integer totalQuantity, MultipartFile multipartFile) throws IOException {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            Product product1 = new Product();
            product1.setName(name);
            product1.setPrice(price);
            product1.setDescription(description);
            product1.setTotalQuantity(totalQuantity);
            product1.setCategory(categoryOptional.get());
            productRepository.save(product1);

            ProductMedia productMedia = new ProductMedia();
            productMedia.setProduct(product1);
            String image = fileStorageService.storeFile(multipartFile);
            productMedia.setImage(image);
            productMediaRepository.save(productMedia);
        }
        throw new BadRequestException("Không tìm thấy loại sản phẩm");
    }

    @Override
    public void createImgProduct(Integer id, MultipartFile file) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            ProductMedia productMedia = new ProductMedia();
            Product product1 = product.get();
            productMedia.setProduct(product1);
            String image = fileStorageService.storeFile(file);
            productMedia.setImage(image);
            productMediaRepository.save(productMedia);
        } else {
            throw new BadRequestException("Không tìm thấy sản phẩm");
        }
    }

    @Override
    public void changeProduct(Integer id, ProductRequest productRequest) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product product1 = product.get();
            product1.setName(productRequest.getName());
            product1.setPrice(productRequest.getPrice());
            product1.setDescription(productRequest.getDescription());
            product1.setTotalQuantity(productRequest.getTotalQuantity());
            productRepository.save(product1);
        } else {
            throw new BadRequestException("khoong tìm thấy sản phẩm");
        }
    }

    @Override
    public void deleteProduct(Integer id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            
        } else {
            throw new BadRequestException("không tìm thấy sản phẩm");
        }
    }

}
