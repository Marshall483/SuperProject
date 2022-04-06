package ru.itis.javalab.models;

import lombok.*;
import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Document {
    private Long id;
    private String documentName;
    private String documentType;
    private String documentText;
    private LocalDate createdAt;
}
