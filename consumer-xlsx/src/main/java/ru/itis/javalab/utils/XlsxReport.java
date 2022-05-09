package ru.itis.javalab.utils;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ru.itis.javalab.constants.DateOptions;
import ru.itis.javalab.exceptions.XlsxGenerationException;
import ru.itis.javalab.forms.DocumentForm;
import ru.itis.javalab.models.Document;
import ru.itis.javalab.models.WebClientModel;
import ru.itis.javalab.rabbit.RabbitOption;
import ru.itis.javalab.rabbit.RoutingKeys;
import ru.itis.javalab.repositories.DocumentRepository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class XlsxReport {

    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DateOptions.DATE_FORMAT)
            .withLocale(DateOptions.LOCAL_DATE);

    private DocumentRepository documentRepository;


    private RabbitTemplate rabbitTemplate;

    @Autowired
    public XlsxReport(DocumentRepository documentRepository, RabbitTemplate rabbitTemplate) {
        this.documentRepository = documentRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Async
    public void getXlsxReport(List<WebClientModel> data, Long id, boolean isTelegram) {
        ByteArrayOutputStream outputStream;

        try {
                XSSFWorkbook ekp = new XSSFWorkbook();

                outputStream = new ByteArrayOutputStream();

                Sheet sheet = ekp.createSheet("Report");

                int rowNum = 0;
                Row row;
                row = sheet.createRow(rowNum);

                Cell cell = row.createCell(0);
                cell.setCellValue("project name");
                sheet.autoSizeColumn(0);

                cell = row.createCell(1);
                cell.setCellValue("spring id");
                sheet.autoSizeColumn(1);

                cell = row.createCell(2);
                cell.setCellValue("issue id");
                sheet.autoSizeColumn(2);

                cell = row.createCell(3);
                cell.setCellValue("issue name");
                sheet.autoSizeColumn(3);

                cell = row.createCell(4);
                cell.setCellValue("status");
                sheet.autoSizeColumn(4);

                cell = row.createCell(5);
                cell.setCellValue("estimated time in hours");
                sheet.autoSizeColumn(5);

                cell = row.createCell(6);
                cell.setCellValue("total spent time in hours");
                sheet.autoSizeColumn(6);

                rowNum++;

                for (WebClientModel model : data) {
                    row = sheet.createRow(rowNum);

                    cell = row.createCell(0);
                    cell.setCellType(CellType.STRING);
                    cell.setCellValue(model.getProjectName());

                    cell = row.createCell(1);
                    cell.setCellType(CellType.STRING);
                    if (model.getSpringId() != null) {
                        cell.setCellValue(model.getSpringId().toString());
                    }

                    cell = row.createCell(2);
                    cell.setCellType(CellType.STRING);
                    if (model.getIssueId() != null) {
                        cell.setCellValue(model.getIssueId().toString());
                    }

                    cell = row.createCell(3);
                    cell.setCellType(CellType.STRING);
                    cell.setCellValue(model.getIssueName());

                    cell = row.createCell(4);
                    cell.setCellType(CellType.STRING);
                    cell.setCellValue(model.getStatus());

                    cell = row.createCell(5);
                    cell.setCellType(CellType.STRING);
                    cell.setCellValue(model.getEstimatedDueTimeInHours());

                    cell = row.createCell(6);
                    cell.setCellType(CellType.STRING);
                    cell.setCellValue(model.getTotalSpentTimeInHours());

                    rowNum++;
                }

            ekp.write(outputStream);
            outputStream.close();

            Document document = documentRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Документ не найден"));
            document.setDocumentContent(outputStream.toByteArray());
            document.setDocumentType("xlsx");
            document.setCreatedAt(LocalDate.now());
            document.setIsReady(true);
            document.setDocumentName("Выгрузка");

            documentRepository.save(document);

            if (isTelegram) {
                rabbitTemplate.convertAndSend(RabbitOption.EXCHANGE, RoutingKeys.XLSX_ROUTING_KEY.toString(), document);
            }


        } catch (IOException ex) {
            throw new XlsxGenerationException("Ошибка в генерации эксель файла", ex);
        }
    }
}
