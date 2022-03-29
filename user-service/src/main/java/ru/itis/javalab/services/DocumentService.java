package ru.itis.javalab.services;

import ru.itis.javalab.forms.DocumentForm;

import java.io.ByteArrayOutputStream;

public interface DocumentService {

    ByteArrayOutputStream getReport(DocumentForm documentForm);
}
