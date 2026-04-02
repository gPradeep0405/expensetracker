package com.spendsmart.controller;

import com.spendsmart.dto.BudgetDto;
import com.spendsmart.model.User;
import com.spendsmart.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public ResponseEntity<BudgetDto> setBudget(@AuthenticationPrincipal User user, @RequestBody BudgetDto dto) {
        return ResponseEntity.ok(budgetService.setBudget(user.getId(), dto));
    }

    @GetMapping
    public ResponseEntity<List<BudgetDto>> getBudgets(@AuthenticationPrincipal User user,
                                                      @RequestParam int year,
                                                      @RequestParam int month) {
        return ResponseEntity.ok(budgetService.getBudgets(user.getId(), year, month));
    }
}
