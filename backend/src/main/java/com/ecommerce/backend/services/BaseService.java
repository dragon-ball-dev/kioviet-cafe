package com.ecommerce.backend.services;

import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.secruity.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;


public abstract class BaseService {
    @Autowired
    UserRepository userRepository;

    public String getUsername(){
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return user.getUsername();
    }

    public Long getUserId(){
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return user.getId();
    }

}
