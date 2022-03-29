package ru.itis.javalab.exceptions;

public class NoSuchRoutingKeyException extends RuntimeException {
    public NoSuchRoutingKeyException(String message) {
        super(message);
    }
}
