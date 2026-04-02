package com.spendsmart.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpenseDto {
    private Long id;
    private BigDecimal amount;
    private String notes;
    private String category;
    private LocalDate expenseDate;

    public ExpenseDto() {}

    public ExpenseDto(Long id, BigDecimal amount, String notes, String category, LocalDate expenseDate) {
        this.id = id;
        this.amount = amount;
        this.notes = notes;
        this.category = category;
        this.expenseDate = expenseDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }
}
