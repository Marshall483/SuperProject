package ru.itis.javalab.rabbit;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.itis.javalab.constants.RabbitOption;
import ru.itis.javalab.forms.DocumentForm;
import ru.itis.javalab.utils.XlsxReport;

@Component
public class Consumer {

    @Autowired
    private XlsxReport xlsxReport;

    @RabbitListener(queues = RabbitOption.QUEUE)
    public byte[] consumeMessageFromQueue(DocumentForm documentForm) {
        return xlsxReport.getXlsxReport(documentForm);
    }
}
