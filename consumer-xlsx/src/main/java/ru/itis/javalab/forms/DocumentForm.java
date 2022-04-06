package ru.itis.javalab.forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DocumentForm {
    private String documentName;
    private String documentType;
    private String documentText;
}
