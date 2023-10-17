package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.models.Category;
import com.ecommerce.backend.domain.payload.request.CategoryRequest;
import com.ecommerce.backend.services.CategoryService;
import com.nimbusds.oauth2.sdk.GeneralException;
import com.nimbusds.oauth2.sdk.ParseException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
public class CategoryController extends BaseController {
    @Autowired
    CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestBody CategoryRequest category){
        categoryService.createCategory(category);
        return createSuccessResponse("Create category", "Tạo danh muc thành công ^^" );
    }

    @GetMapping("/getAll")
    public Page<CategoryRequest> getAll(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return categoryService.getAll(page, pageSize);
    }
    @PatchMapping
    public ResponseEntity<?> changeCategory(@RequestParam Integer id, @RequestBody CategoryRequest categoryRequest) {
        categoryService.changeCategory(id, categoryRequest);
        return createSuccessResponse("change category", "chiỉnh sửa thanh công");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteCategory(@RequestParam Integer id) {
        categoryService.deleteCategory(id);
        return createSuccessResponse("delete category", "xóa thành công");
    }

    @GetMapping
    public ResponseEntity<CategoryRequest> findByName(@RequestParam String name) {
        return categoryService.findCategoryByName(name);
    }

}
