package com.homeservices.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Provider provider;

    private LocalDateTime slot;
    private boolean paid;
    private double amount;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Provider getProvider() { return provider; }
    public void setProvider(Provider provider) { this.provider = provider; }
    public LocalDateTime getSlot() { return slot; }
    public void setSlot(LocalDateTime slot) { this.slot = slot; }
    public boolean isPaid() { return paid; }
    public void setPaid(boolean paid) { this.paid = paid; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}