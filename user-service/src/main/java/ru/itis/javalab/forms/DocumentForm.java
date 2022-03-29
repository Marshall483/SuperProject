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

    /**
     * Название документа.
     */
    private String documentName;

    /**
     * Тип документа (pdf/xlsx).
     */
    private String documentType;

    /**
     * Cодержание текста.
     */
    private String documentText;
}
