package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.models.Category;
import com.ecommerce.backend.domain.payload.request.CategoryRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface CategoryService {
    void createCategory(CategoryRequest category);
    Page<CategoryRequest> getAll(Integer page, Integer pageSize);
    void changeCategory(Integer id, CategoryRequest categoryRequest);
    void deleteCategory(Integer id);
    // tìm kiếm category
    ResponseEntity<CategoryRequest> findCategoryByName(String name);
    ResponseEntity<CategoryRequest> getById(Integer id);

}
