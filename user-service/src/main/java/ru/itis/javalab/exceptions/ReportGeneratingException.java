package ru.itis.javalab.exceptions;

public class ReportGeneratingException extends RuntimeException {
    public ReportGeneratingException(String message, Throwable cause) {
        super(message, cause);
    }
}
