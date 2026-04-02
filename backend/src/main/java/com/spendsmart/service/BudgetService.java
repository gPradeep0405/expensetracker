package com.spendsmart.service;

import com.spendsmart.dto.BudgetDto;
import com.spendsmart.model.Budget;
import com.spendsmart.model.User;
import com.spendsmart.repository.BudgetRepository;
import com.spendsmart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetService(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    public BudgetDto setBudget(Long userId, BudgetDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Budget budget = budgetRepository.findByUserIdAndCategoryAndYearAndMonth(
                userId, dto.getCategory(), dto.getYear(), dto.getMonth()
        ).orElse(new Budget(user, dto.getCategory(), dto.getMonthlyLimit(), dto.getMonth(), dto.getYear()));

        budget.setMonthlyLimit(dto.getMonthlyLimit());
        return mapToDto(budgetRepository.save(budget));
    }

    public List<BudgetDto> getBudgets(Long userId, int year, int month) {
        return budgetRepository.findByUserIdAndYearAndMonth(userId, year, month)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private BudgetDto mapToDto(Budget b) {
        return new BudgetDto(b.getId(), b.getCategory(), b.getMonthlyLimit(), b.getMonth(), b.getYear());
    }
}
