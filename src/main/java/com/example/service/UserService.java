package com.example.service;
import com.example.model.User;

import java.util.List;


public interface UserService {
    void addUser(User user);
    void deleteUser(Long id);
    User getUserById(Long id);
    List<User> getAllUsers();
}
