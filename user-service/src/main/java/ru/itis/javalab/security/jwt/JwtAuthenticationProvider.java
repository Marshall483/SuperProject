package ru.itis.javalab.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.itis.javalab.models.User;
import ru.itis.javalab.repositories.UsersRepository;

import java.util.NoSuchElementException;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private Algorithm algorithm;

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        JwtAuthentication tokenAuthentication = (JwtAuthentication) authentication;

        DecodedJWT jwt;

        try {
            jwt = JWT
                    .require(algorithm)
                    .build()
                    .verify(authentication.getName());

        } catch (JWTVerificationException e) {
            throw new BadCredentialsException("Bad token");
        }

        tokenAuthentication.setAuthenticated(true);
        tokenAuthentication.setAuthority(jwt.getClaim("role").asString());
        return tokenAuthentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JwtAuthentication.class.equals(authentication);
    }

    public User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String token = authentication.getName();
        DecodedJWT decodedJWT = JWT.decode(token);
        String val = decodedJWT.getClaim("email").asString();
        return usersRepository.findByLogin(val).orElseThrow(() -> new NoSuchElementException("No such user"));
    }
}
