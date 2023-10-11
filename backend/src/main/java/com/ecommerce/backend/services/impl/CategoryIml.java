package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Category;
import com.ecommerce.backend.domain.payload.request.CategoryRequest;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.services.CategoryService;
import com.ecommerce.backend.utils.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryIml implements CategoryService  {

    @Autowired
    CategoryRepository categoryRepository;
    private final MapperUtils mapperUtils;

    public CategoryIml(MapperUtils mapperUtils) {
        this.mapperUtils = mapperUtils;
    }

    @Override
    public void createCategory(CategoryRequest category) {
        Category category1 = new Category();
        List<Category> categoryList = categoryRepository.findAll();
        for (Category c : categoryList) {
            if (category.getName().equals(c.getName())) {
                throw new BadRequestException("Trùng danh mục");
            }
        }
        category1.setName(category.getName());
        categoryRepository.save(category1);
    }

    @Override
    public Page<CategoryRequest> getAll(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Category> categoryPage = categoryRepository.findAll(pageable);
        return mapperUtils.convertToResponsePage(categoryPage, CategoryRequest.class, pageable);
    }
}
