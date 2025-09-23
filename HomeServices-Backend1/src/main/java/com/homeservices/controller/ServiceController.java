package com.homeservices.controller;

import com.homeservices.model.ServiceType;
import com.homeservices.repository.ServiceTypeRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {
    private final ServiceTypeRepository repo;
    public ServiceController(ServiceTypeRepository repo) { this.repo = repo; }

    @GetMapping
    public List<ServiceType> all() {
        return repo.findAll();
    }
}