package ru.itis.javalab.utils;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import ru.itis.javalab.constants.DateOptions;
import ru.itis.javalab.exceptions.XlsxGenerationException;
import ru.itis.javalab.forms.DocumentForm;
import ru.itis.javalab.models.Document;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class XlsxReport {

    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DateOptions.DATE_FORMAT, DateOptions.LOCAL_DATE);
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DateOptions.DATE_FORMAT).withLocale(DateOptions.LOCAL_DATE);

    public byte[] getXlsxReport(DocumentForm documentForm) {
        ByteArrayOutputStream outputStream;

        try {
            Document document = Document.builder()
                    .documentName(documentForm.getDocumentName())
                    .documentType(documentForm.getDocumentType())
                    .documentText(documentForm.getDocumentText())
                    .createdAt(LocalDate.now())
                    .build();

            XSSFWorkbook ekp = new XSSFWorkbook();
            outputStream = new ByteArrayOutputStream();

            Sheet sheet = ekp.createSheet("Report");

            int rowNum = 0;
            Row row;
            row = sheet.createRow(rowNum);

            Cell cell = row.createCell(0);
            cell.setCellValue("Id");
            sheet.autoSizeColumn(0);

            cell = row.createCell(1);
            cell.setCellValue("documentName");
            sheet.autoSizeColumn(1);

            cell = row.createCell(2);
            cell.setCellValue("documentType");
            sheet.autoSizeColumn(2);

            cell = row.createCell(3);
            cell.setCellValue("documentText");
            sheet.autoSizeColumn(3);

            cell = row.createCell(4);
            cell.setCellValue("createdAt");
            sheet.autoSizeColumn(4);

            rowNum++;

            row = sheet.createRow(rowNum);

            cell = row.createCell(0);
            cell.setCellType(CellType.STRING);
            cell.setCellValue(UUID.randomUUID().toString());

            cell = row.createCell(1);
            cell.setCellType(CellType.STRING);
            cell.setCellValue(document.getDocumentName());

            cell = row.createCell(2);
            cell.setCellType(CellType.STRING);
            cell.setCellValue(document.getDocumentType());

            cell = row.createCell(3);
            cell.setCellType(CellType.STRING);
            cell.setCellValue(document.getDocumentText());

            cell = row.createCell(4);
            cell.setCellType(CellType.NUMERIC);
            String createdTime = getDateWithCorrectForm(document.getCreatedAt());
            cell.setCellValue(simpleDateFormat.parse(createdTime));


            ekp.write(outputStream);
            outputStream.close();
        } catch (ParseException | IOException ex) {
            throw new XlsxGenerationException("Ошибка в генерации эксель файла", ex);
        }
        return outputStream.toByteArray();
    }

    private String getDateWithCorrectForm(LocalDate localDate) {
        String date = " ";
        if (localDate != null) {
            date = String.format("%s", localDate.format(dateTimeFormatter));
        }
        return date;
    }
}
