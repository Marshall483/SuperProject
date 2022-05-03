package ru.itis.javalab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ConsumerXlsxApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConsumerXlsxApplication.class, args);
    }

}
