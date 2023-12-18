package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.payload.request.CartRequest;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    @Override
    public CartRequest addToCart(CartRequest cartRequest) {
        return null;
    }
}
