package com.spendsmart.dto;

import java.math.BigDecimal;

public class BudgetDto {
    private Long id;
    private String category;
    private BigDecimal monthlyLimit;
    private int month;
    private int year;

    public BudgetDto() {}

    public BudgetDto(Long id, String category, BigDecimal monthlyLimit, int month, int year) {
        this.id = id;
        this.category = category;
        this.monthlyLimit = monthlyLimit;
        this.month = month;
        this.year = year;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public BigDecimal getMonthlyLimit() { return monthlyLimit; }
    public void setMonthlyLimit(BigDecimal monthlyLimit) { this.monthlyLimit = monthlyLimit; }
    public int getMonth() { return month; }
    public void setMonth(int month) { this.month = month; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
}
