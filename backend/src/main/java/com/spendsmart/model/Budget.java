package com.spendsmart.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String category;

    @Column(name = "monthly_limit", nullable = false)
    private BigDecimal monthlyLimit;

    @Column(name = "budget_month", nullable = false)
    private int month;

    @Column(name = "budget_year", nullable = false)
    private int year;

    public Budget() {}

    public Budget(User user, String category, BigDecimal monthlyLimit, int month, int year) {
        this.user = user;
        this.category = category;
        this.monthlyLimit = monthlyLimit;
        this.month = month;
        this.year = year;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public BigDecimal getMonthlyLimit() { return monthlyLimit; }
    public void setMonthlyLimit(BigDecimal monthlyLimit) { this.monthlyLimit = monthlyLimit; }
    public int getMonth() { return month; }
    public void setMonth(int month) { this.month = month; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
}
