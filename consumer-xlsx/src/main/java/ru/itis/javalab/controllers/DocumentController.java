package ru.itis.javalab.controllers;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itis.javalab.dto.DocumentDto;
import ru.itis.javalab.forms.DocumentForm;
import ru.itis.javalab.services.DocumentService;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/generator")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/export")
    @Operation(summary = "Генерация асинхронного отчета")
    public ResponseEntity<Long> generateExport(@RequestBody DocumentForm documentForm) {
        return new ResponseEntity<>(documentService.generateExport(documentForm), HttpStatus.OK);
    }

    @PostMapping("/export/telegram")
    @Operation(summary = "Отправка асинхронного отчета в телеграм")
    public ResponseEntity<Long> sendExport(@RequestBody DocumentForm documentForm) {
        return new ResponseEntity<>(documentService.generateExportForSending(documentForm), HttpStatus.OK);
    }

    @GetMapping("/export/status/{id}")
    @Operation(summary = "Проверка готовности отчета")
    public ResponseEntity<?> getExport(@PathVariable Long id) throws UnsupportedEncodingException {

        DocumentDto file = documentService.getReport(id);
        String fileName = String.format("Report_in.%s", file.getFileFormat());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString()) + "\"")
                .body(file.getFile().toByteArray());
    }
}
