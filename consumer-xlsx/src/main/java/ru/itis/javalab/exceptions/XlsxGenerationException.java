package ru.itis.javalab.exceptions;

public class XlsxGenerationException extends RuntimeException {
    public XlsxGenerationException(String message, Throwable cause) {
        super(message, cause);
    }
}
