package ru.itis.javalab.controllers;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.itis.javalab.dto.TokenDto;
import ru.itis.javalab.forms.UserForm;
import ru.itis.javalab.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserLoginController {

    @Autowired
    private UserService loginService;

    @PostMapping("/login")
    @Operation(summary = "Авторизация юзера")
    public ResponseEntity<TokenDto> login(@RequestBody UserForm userForm) {
        return ResponseEntity.ok(loginService.login(userForm));
    }
}
