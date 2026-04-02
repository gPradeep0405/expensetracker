package com.spendsmart.controller;

import com.spendsmart.dto.ExpenseDto;
import com.spendsmart.model.User;
import com.spendsmart.service.ExpenseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<ExpenseDto> createExpense(@AuthenticationPrincipal User user, @RequestBody ExpenseDto dto) {
        return ResponseEntity.ok(expenseService.createExpense(user.getId(), dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDto> updateExpense(@AuthenticationPrincipal User user, 
                                                    @PathVariable Long id, 
                                                    @RequestBody ExpenseDto dto) {
        return ResponseEntity.ok(expenseService.updateExpense(id, user.getId(), dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@AuthenticationPrincipal User user, @PathVariable Long id) {
        expenseService.deleteExpense(id, user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<ExpenseDto>> getAllExpenses(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Pageable pageable) {
        
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(expenseService.getExpensesByCategory(user.getId(), category, pageable));
        } else if (startDate != null && endDate != null) {
            return ResponseEntity.ok(expenseService.getExpensesByDateRange(user.getId(), startDate, endDate, pageable));
        }
        return ResponseEntity.ok(expenseService.getExpensesByUser(user.getId(), pageable));
    }
}
