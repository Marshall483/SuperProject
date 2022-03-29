package ru.itis.javalab.redis.repository;


import org.springframework.data.keyvalue.repository.KeyValueRepository;
import ru.itis.javalab.redis.models.RedisUser;

public interface RedisUsersRepository extends KeyValueRepository<RedisUser, String> {
}
