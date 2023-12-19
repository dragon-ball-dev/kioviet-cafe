package com.ecommerce.backend.services;

import com.ecommerce.backend.secruity.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;


public abstract class BaseService {

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
