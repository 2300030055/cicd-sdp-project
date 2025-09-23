package com.homeservices.model;

import jakarta.persistence.*;

@Entity
public class Provider {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double rating;
    private String location;

    @ManyToOne
    @JoinColumn(name = "service_type_id")
    private ServiceType serviceType;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public ServiceType getServiceType() { return serviceType; }
    public void setServiceType(ServiceType serviceType) { this.serviceType = serviceType; }
}