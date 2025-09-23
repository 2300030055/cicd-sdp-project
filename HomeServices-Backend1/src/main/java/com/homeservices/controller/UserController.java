package com.homeservices.controller;

import com.homeservices.model.User;
import com.homeservices.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserRepository repo;
    public UserController(UserRepository repo) { this.repo = repo; }

    // SIGNUP ENDPOINT
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body("User already exists");
        }
        User saved = repo.save(user);
        return ResponseEntity.ok(saved);
    }

    // LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User login) {
        Optional<User> user = repo.findByEmailAndPassword(login.getEmail(), login.getPassword());
        if (user.isPresent()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    // RESET PASSWORD ENDPOINT (demo: just checks if email exists)
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody User req) {
        Optional<User> user = repo.findByEmail(req.getEmail());
        if (user.isPresent()) {
            // In real app, send email here
            return ResponseEntity.ok("Reset link sent (simulated)");
        } else {
            return ResponseEntity.status(404).body("Email not found");
        }
    }
}