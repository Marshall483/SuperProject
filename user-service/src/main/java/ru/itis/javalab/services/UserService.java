package ru.itis.javalab.services;

import ru.itis.javalab.dto.TokenDto;
import ru.itis.javalab.dto.UserDto;
import ru.itis.javalab.forms.UserForm;

public interface UserService {
    UserDto registerUser(UserForm userForm);

    TokenDto login(UserForm userForm);
}
