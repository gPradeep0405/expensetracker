package com.spendsmart.repository;

import com.spendsmart.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserIdAndYearAndMonth(Long userId, int year, int month);
    Optional<Budget> findByUserIdAndCategoryAndYearAndMonth(Long userId, String category, int year, int month);
}
