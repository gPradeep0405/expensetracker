package com.spendsmart.service;

import com.spendsmart.dto.AuthRequest;
import com.spendsmart.dto.AuthResponse;
import com.spendsmart.dto.RegisterRequest;
import com.spendsmart.model.Role;
import com.spendsmart.model.User;
import com.spendsmart.repository.UserRepository;
import com.spendsmart.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use.");
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole() != null ? request.getRole() : Role.USER
        );

        User savedUser = userRepository.save(user);

        String jwt = jwtUtil.generateToken(savedUser);
        return new AuthResponse(jwt, savedUser.getEmail(), savedUser.getName(), savedUser.getRole());
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        String jwt = jwtUtil.generateToken(user);
        return new AuthResponse(jwt, user.getEmail(), user.getName(), user.getRole());
    }
}
