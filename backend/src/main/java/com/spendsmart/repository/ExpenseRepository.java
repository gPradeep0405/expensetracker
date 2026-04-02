package com.spendsmart.repository;

import com.spendsmart.model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Page<Expense> findByUserId(Long userId, Pageable pageable);
    Page<Expense> findByUserIdAndCategory(Long userId, String category, Pageable pageable);
    Page<Expense> findByUserIdAndExpenseDateBetween(Long userId, LocalDate startDate, LocalDate endDate, Pageable pageable);
}
