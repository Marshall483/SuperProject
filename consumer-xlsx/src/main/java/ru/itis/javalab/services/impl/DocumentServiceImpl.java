package ru.itis.javalab.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.itis.javalab.dto.DocumentDto;
import ru.itis.javalab.exceptions.XlsxGenerationException;
import ru.itis.javalab.forms.DocumentForm;
import ru.itis.javalab.models.Document;
import ru.itis.javalab.models.WebClientModel;
import ru.itis.javalab.repositories.DocumentRepository;
import ru.itis.javalab.services.DocumentService;
import ru.itis.javalab.services.WebClientService;
import ru.itis.javalab.utils.XlsxReport;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {

    private XlsxReport xlsxReport;
    private DocumentRepository documentRepository;
    private WebClientService webClientService;

    @Autowired
    public DocumentServiceImpl(XlsxReport xlsxReport, DocumentRepository documentRepository, WebClientService webClientService) {
        this.xlsxReport = xlsxReport;
        this.documentRepository = documentRepository;
        this.webClientService = webClientService;
    }

    /**
     * Метод для асинхронной генерации отчета.
     * Возвращает id документы для последующего запроса.
     */
    @Override
    @Transactional
    public Long generateExport(DocumentForm documentForm) {
        Long docId = documentRepository.save(Document.builder().build()).getId();
        List<WebClientModel> data = webClientService.getValue(documentForm.getId().toString());
        xlsxReport.getXlsxReport(data, docId, false);
        return docId;
    }

    /**
     * Метод для асинхронной генерации отчета с последующей отправкой на сервис tg-бота.
     * Возвращает id документы для последующего запроса.
     */
    @Override
    @Transactional
    public Long generateExportForSending(DocumentForm documentForm) {
        Long docId = documentRepository.save(Document.builder().isReady(Boolean.FALSE).build()).getId();
        List<WebClientModel> data = webClientService.getValue(documentForm.getId().toString());
        xlsxReport.getXlsxReport(data, docId, true);
        return docId;
    }

    /**
     * Получегие репорта по Id.
     */
    @Override
    @Transactional
    public DocumentDto getReport(Long id) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = documentRepository.findById(id)
                    .orElseThrow(() -> new XlsxGenerationException("Документ еще не готов, обратитесь позже"));
            if (document.getIsReady() == Boolean.FALSE) {
                throw new XlsxGenerationException("Документ еще не готов, обратитесь позже");
            }

            outputStream.write(document.getDocumentContent());
            return DocumentDto.builder().file(outputStream).fileFormat("xlsx").build();
        } catch (IOException ex) {
            throw new IllegalArgumentException("Ошибка выгрузки");
        }
    }
}
