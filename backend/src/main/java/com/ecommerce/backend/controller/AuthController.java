package com.ecommerce.backend.controller;


import com.ecommerce.backend.controller.base.BaseController;
import com.ecommerce.backend.domain.payload.request.*;
import com.ecommerce.backend.domain.payload.response.ApiResponse;
import com.ecommerce.backend.domain.payload.response.AuthResponse;
import com.ecommerce.backend.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController extends BaseController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Đăng nhập tài khoản")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(new AuthResponse(authService.login(loginRequest)));
    }

    @GetMapping("/get-all-account")
    public ResponseEntity<?> getAllAccount(@RequestParam(required = false) String keyword,
                                           @RequestParam Integer pageNo,
                                           @RequestParam Integer pageSize){
        return ResponseEntity.ok(authService.getAllAccount(keyword,pageNo,pageSize));
    }

    @PostMapping("/signup")
    @Operation(summary = "Đăng kí tài khoản")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) throws MessagingException, IOException {
        return ResponseEntity.created(authService.registerAccount(signUpRequest))
                .body(new ApiResponse(true, "User registered successfully@"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody EmailRequest emailRequest) throws MessagingException, IOException {
        return ResponseEntity.ok(authService.forgotPassword(emailRequest));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        return ResponseEntity.ok(authService.resetPassword(resetPasswordRequest));
    }

    @PostMapping("/confirmed")
    public ResponseEntity<?> confirmedAccount(@RequestBody EmailRequest emailRequest){
        return ResponseEntity.ok(authService.confirmedAccount(emailRequest));
    }

    @PostMapping("/change-password")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        return ResponseEntity.ok(authService.changePassword(changePasswordRequest));
    }

    @PostMapping("/upload-avatar")
    @SecurityRequirement(name = "Bearer Authentication")
    public  ResponseEntity<?> changeImage(@RequestParam(required = false) MultipartFile file){
        return ResponseEntity.ok(authService.changeImage(file));
    }

    @PostMapping("/upload-profile")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<?> changeImage(@RequestParam(required = false) MultipartFile file,
                                         @RequestParam(required = false) String zalo,
                                         @RequestParam(required = false) String facebook,
                                         @RequestParam(required = false) String address) {
        return ResponseEntity.ok(authService.uploadProfile(file, zalo, facebook, address));
    }


    @PostMapping("/{id}/locked")
    @Operation(summary = "Khóa tài khoản")
    @SecurityRequirement(name = "Bearer Authentication")
    private ResponseEntity<?> lockedAccount(@PathVariable Long id) {
        return ResponseEntity.ok(authService.lockAccount(id));
    }
}
