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
import org.springframework.http.HttpStatus;
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

    @Override
    public void changeCategory(Integer id, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(id).get();
        if (category == null) {
            throw new BadRequestException("không tim thấy loại sản phẩm");
        }
        category.setName(categoryRequest.getName());
        categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id).get();
        if (category == null) {
            throw new BadRequestException("không tìm thấy loại sản phẩm");
        }
        categoryRepository.delete(category);
    }

    @Override
    public ResponseEntity<CategoryRequest> findCategoryByName(String name) {
        Category category = categoryRepository.findByName(name);
        if (category == null) {
            throw new BadRequestException("không tìm thấy loại sản phẩm");
        }
        return new ResponseEntity<>(mapperUtils.convertToResponse(category, CategoryRequest.class), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CategoryRequest> getById(Integer id) {
        Category category = categoryRepository.findById(id).get();
        if (category == null) {
            throw new BadRequestException("khong tìm thấy loại sản phẩm");
        }
        CategoryRequest categoryRequest = mapperUtils.convertToEntity(category, CategoryRequest.class);
        return new ResponseEntity<>(categoryRequest, HttpStatus.OK);
    }
}
