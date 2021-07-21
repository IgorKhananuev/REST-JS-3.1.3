package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
public class MainController {

    private final UserService userService;

    @Autowired
    public MainController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(value = "/user")
    public String userPage(Model model) {
        model.addAttribute("userAuthentication", (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal());
        return "user";
    }

    @GetMapping(value = "/admin")
    public String adminPage(Model model){
        model.addAttribute("userAuthentication", (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal());
        return "admin";
    }
}