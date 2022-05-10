package ru.itis.javalab.services;

import ru.itis.javalab.dto.DocumentDto;
import ru.itis.javalab.forms.DocumentForm;


public interface DocumentService {

    Long generateExport(DocumentForm documentForm);

    Long generateExportForSending(DocumentForm documentForm);

    DocumentDto getReport(Long id);
}
