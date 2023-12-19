package com.ecommerce.backend.controller;

import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.request.CartRequest;
import com.ecommerce.backend.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController extends BaseController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody CartRequest cartRequest){
        cartService.addToCart(cartRequest);
        return createSuccessResponse("Add to cart", "Thên sản phẩm thành công");
    }

    @GetMapping
    public ResponseEntity<?> getAllCart(@RequestParam Integer pageNo, @RequestParam Integer pageSize){
        return createSuccessResponse("Get all cart", cartService.getAllCartByUserId(pageNo, pageSize));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        return createSuccessResponse("Delete cart", cartService.deleteCartById(id));
    }

}
