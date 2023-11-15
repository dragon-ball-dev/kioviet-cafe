package com.ecommerce.backend.exception;

public class NotEnoughProductsException extends RuntimeException{
    public NotEnoughProductsException(String message) {
        super(message);
    }

    public NotEnoughProductsException(String message, Throwable cause) {
        super(message, cause);
    }
}
