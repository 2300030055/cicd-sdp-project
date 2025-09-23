package com.homeservices.controller;

import com.homeservices.model.Provider;
import com.homeservices.repository.ProviderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "http://localhost:5173")
public class ProviderController {
    private final ProviderRepository repo;
    public ProviderController(ProviderRepository repo) { this.repo = repo; }

    @GetMapping("/by-service/{serviceId}")
    public List<Provider> byService(@PathVariable Long serviceId) {
        return repo.findByServiceTypeId(serviceId);
    }

    @GetMapping("/{id}")
    public Provider get(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }
}