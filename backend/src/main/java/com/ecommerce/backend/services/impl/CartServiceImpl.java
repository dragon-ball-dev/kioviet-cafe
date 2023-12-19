package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.*;
import com.ecommerce.backend.domain.payload.request.CartRequest;
import com.ecommerce.backend.domain.payload.response.CartResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.services.BaseService;
import com.ecommerce.backend.services.CartService;
import com.ecommerce.backend.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl extends BaseService implements CartService{

    private final CartRepository cartRepository;
    private final StoreRepository storeRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SupplyRepository supplyRepository;
    private final UserRepository userRepository;
    private final MapperUtils mapper;
    @Override
    public CartRequest addToCart(CartRequest cartRequest) {
        Store store = storeRepository.findById(cartRequest.getStoreId()).orElseThrow(() -> new BadRequestException("Cửa hàng không tồn tại"));
        Product product = productRepository.findById(cartRequest.getProductId()).orElseThrow(() -> new BadRequestException("Sản phẩm không tồn tại"));
        Supply supply = supplyRepository.findById(cartRequest.getSupplyId()).orElseThrow(() -> new BadRequestException("Nhà cung cấp không tồn tại"));
        Customer customer = customerRepository.findById(cartRequest.getCustomerId()).orElseThrow(() -> new BadRequestException("Khách hàng không tồn tại"));
        User user = userRepository.findById(getUserId()).orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại."));
        Optional<Cart> cart = cartRepository.findByCustomerAndStoreAndUserAndSupply(customer,store,user,supply);
        if (cart.isPresent()) {
            cart.get().setQuantity(cart.get().getQuantity() + 1);
            cartRepository.save(cart.get());
        } else {
            Cart cartNew = new Cart(store,product,supply,customer,user, cartRequest.getQuantity());
            cartRepository.save(cartNew);
        }
        return cartRequest;
    }

    @Override
    public Page<CartResponse> getAllCartByUserId(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapper.convertToResponsePage(cartRepository.findAllByUser(getUserId(), pageable), CartResponse.class, pageable);
    }

    @Override
    public String deleteCartById(Long id) {
        cartRepository.findById(id);
        return "Xóa sản phẩm trong giỏ hàng thành công ";
    }
}
