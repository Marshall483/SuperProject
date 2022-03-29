package ru.itis.javalab.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.itis.javalab.dto.ExceptionDto;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDto> handleError(Exception e) {
        return ResponseEntity.badRequest().body(ExceptionDto.builder().message(e.getLocalizedMessage()).build());
    }
}
