package ru.itis.javalab.redis.services;

import ru.itis.javalab.models.User;

public interface RedisUsersService {
    void addTokenToUser(User user, String token);

    void addAllTokensToBlackList(User user);
}
