package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminRestController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/userAuth")
    public ResponseEntity<User> getUserAuth() {
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users != null ? ResponseEntity.ok(users) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.addUser(user);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/users/edit")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        userService.addUser(user);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.badRequest().build();
    }
}
