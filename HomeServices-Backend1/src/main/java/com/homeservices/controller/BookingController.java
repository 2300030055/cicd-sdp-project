package com.homeservices.controller;

import com.homeservices.model.Booking;
import com.homeservices.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")

@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {
    private final BookingRepository repo;
    public BookingController(BookingRepository repo) { this.repo = repo; }

    @GetMapping("/user/{userId}")
    public List<Booking> byUser(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }

    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        return repo.save(booking);
    }

    @PutMapping("/{id}/pay")
    public Booking pay(@PathVariable Long id, @RequestBody Booking payment) {
        Booking b = repo.findById(id).orElseThrow();
        b.setPaid(true);
        b.setAmount(payment.getAmount());
        return repo.save(b);
    }
}