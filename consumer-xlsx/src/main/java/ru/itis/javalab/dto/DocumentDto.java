package ru.itis.javalab.dto;

import lombok.*;

import java.io.ByteArrayOutputStream;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class DocumentDto {
    private ByteArrayOutputStream file;
    private String fileFormat;

}
