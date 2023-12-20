package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.CartRequest;
import com.ecommerce.backend.domain.payload.request.UpdateCartRequest;
import com.ecommerce.backend.domain.payload.response.CartResponse;
import org.springframework.data.domain.Page;

public interface CartService {

    CartRequest addToCart(CartRequest cartRequest);

    Page<CartResponse> getAllCartByUserId(Integer pageNo,  Integer pageSize);

    String deleteCartById(Long id);

    void updateQuantityOfProductInCart(UpdateCartRequest updateCartRequest);
}
