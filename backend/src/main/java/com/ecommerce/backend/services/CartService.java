package com.ecommerce.backend.services;

import com.ecommerce.backend.domain.payload.request.CartRequest;

public interface CartService {

    CartRequest addToCart(CartRequest cartRequest);
}
