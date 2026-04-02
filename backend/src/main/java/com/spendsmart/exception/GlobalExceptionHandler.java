package com.spendsmart.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleExceptions(Exception ex) {
        ex.printStackTrace(); // Log stack trace for debugging
        Map<String, String> response = new HashMap<>();
        response.put("error", "An internal server error occurred: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, String>> handleDataAccessException(DataAccessException ex) {
        ex.printStackTrace(); // Log stack trace
        Map<String, String> response = new HashMap<>();
        response.put("error", "Database error: " + ex.getMostSpecificCause().getMessage());
        return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Invalid username or password");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
