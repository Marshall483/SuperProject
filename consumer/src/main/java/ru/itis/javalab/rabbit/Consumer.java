package ru.itis.javalab.rabbit;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.itis.javalab.forms.DocumentForm;
import ru.itis.javalab.utils.PdfReport;

@Component
public class Consumer {

    @Autowired
    private PdfReport pdfReport;

    @RabbitListener(queues = RabbitOption.QUEUE)
    public byte[] consumeMessageFromQueue(DocumentForm documentForm) {
        return pdfReport.createPdf(documentForm);
    }
}
