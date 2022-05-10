package ru.itis.javalab.models;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table
@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String documentName;
    private String documentType;
    private byte[] documentContent;
    private Boolean isReady;
    private LocalDate createdAt;
}
