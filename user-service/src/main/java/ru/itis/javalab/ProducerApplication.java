package ru.itis.javalab;

import com.auth0.jwt.algorithms.Algorithm;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "User Service",
        description = "Registration and Authorization service",
        version = "final"))
public class ProducerApplication {

    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public Algorithm algorithm() {
        return Algorithm.HMAC256(secret);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(ProducerApplication.class, args);
    }

}
