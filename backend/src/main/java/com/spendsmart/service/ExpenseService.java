package com.spendsmart.service;

import com.spendsmart.dto.ExpenseDto;
import com.spendsmart.model.Expense;
import com.spendsmart.model.User;
import com.spendsmart.repository.ExpenseRepository;
import com.spendsmart.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public ExpenseDto createExpense(Long userId, ExpenseDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Expense expense = new Expense(user, dto.getAmount(), dto.getNotes(), dto.getCategory(), dto.getExpenseDate());
        Expense saved = expenseRepository.save(expense);
        return mapToDto(saved);
    }

    public ExpenseDto updateExpense(Long expenseId, Long userId, ExpenseDto dto) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new IllegalArgumentException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Not authorized to update this expense");
        }
        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory());
        expense.setNotes(dto.getNotes());
        expense.setExpenseDate(dto.getExpenseDate());
        return mapToDto(expenseRepository.save(expense));
    }

    public void deleteExpense(Long expenseId, Long userId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new IllegalArgumentException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Not authorized to delete this expense");
        }
        expenseRepository.delete(expense);
    }

    public Page<ExpenseDto> getExpensesByUser(Long userId, Pageable pageable) {
        return expenseRepository.findByUserId(userId, pageable).map(this::mapToDto);
    }

    public Page<ExpenseDto> getExpensesByDateRange(Long userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return expenseRepository.findByUserIdAndExpenseDateBetween(userId, startDate, endDate, pageable)
                .map(this::mapToDto);
    }

    public Page<ExpenseDto> getExpensesByCategory(Long userId, String category, Pageable pageable) {
        return expenseRepository.findByUserIdAndCategory(userId, category, pageable).map(this::mapToDto);
    }

    private ExpenseDto mapToDto(Expense exp) {
        return new ExpenseDto(exp.getId(), exp.getAmount(), exp.getNotes(), exp.getCategory(), exp.getExpenseDate());
    }
}
