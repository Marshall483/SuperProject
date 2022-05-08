package ru.itis.javalab.services.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.itis.javalab.dto.TokenDto;
import ru.itis.javalab.dto.UserDto;
import ru.itis.javalab.forms.UserForm;
import ru.itis.javalab.models.User;
import ru.itis.javalab.redis.services.RedisUsersService;
import ru.itis.javalab.repositories.UsersRepository;
import ru.itis.javalab.services.UserService;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private Algorithm algorithm;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RedisUsersService redisUsersService;

    @Override
    public UserDto registerUser(UserForm userForm) {
        User user = User.builder().login(userForm.getLogin()).name(userForm.getName())
                .password(passwordEncoder.encode(userForm.getPassword()))
                .uuid(UUID.randomUUID())
                .telegramAlias(userForm.getTelegramAlias())
                .role(User.Role.USER).state(User.State.ACTIVE).build();
        usersRepository.save(user);
        return UserDto.from(user);
    }

    @Override
    public TokenDto login(UserForm userForm) {
        User user = usersRepository.findByLogin(userForm.getLogin())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (passwordEncoder.matches(userForm.getPassword(), user.getPassword())) {
            String token = JWT.create()
                    .withSubject(user.getId().toString())
                    .withClaim("role", user.getRole().toString())
                    .withClaim("state", user.getState().toString())
                    .withClaim("email", user.getLogin())
                    .withClaim("createdAt", LocalDateTime.now().toString())
                    .sign(algorithm);
            redisUsersService.addTokenToUser(user, token);
            return TokenDto.builder()
                    .token(token)
                    .uuid(user.getUuid())
                    .build();
        } else {
            throw new UsernameNotFoundException("Invalid username or password");
        }
    }
}
