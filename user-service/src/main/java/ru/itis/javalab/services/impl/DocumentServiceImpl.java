package ru.itis.javalab.services.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.itis.javalab.exceptions.NoSuchRoutingKeyException;
import ru.itis.javalab.exceptions.ReportGeneratingException;
import ru.itis.javalab.forms.DocumentForm;
import ru.itis.javalab.models.Document;
import ru.itis.javalab.models.User;
import ru.itis.javalab.rabbit.RabbitOption;
import ru.itis.javalab.rabbit.RoutingKeys;
import ru.itis.javalab.repositories.DocumentRepository;
import ru.itis.javalab.repositories.UsersRepository;
import ru.itis.javalab.security.jwt.JwtAuthenticationProvider;
import ru.itis.javalab.services.DocumentService;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;

@Slf4j
@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private JwtAuthenticationProvider provider;

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public ByteArrayOutputStream getReport(DocumentForm documentForm) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            String routingKey;
            switch (documentForm.getDocumentType()) {
                case "pdf":
                    routingKey = RoutingKeys.PDF_ROUTING_KEY.toString();
                    break;
                case "xlsx":
                    routingKey = RoutingKeys.XLSX_ROUTING_KEY.toString();
                    break;
                default:
                    throw new NoSuchRoutingKeyException("No such routing key for: " + documentForm.getDocumentType());

            }
            byte[] bytes = (byte[]) rabbitTemplate.convertSendAndReceive(RabbitOption.EXCHANGE, routingKey, documentForm);
            assert bytes != null;

            User user = provider.getUser();

            Document document = Document.builder().user(user).createdDate(LocalDate.now())
                    .docType(documentForm.getDocumentType()).build();

            documentRepository.save(document);

            outputStream.write(bytes);
            return outputStream;
        } catch (IOException ex) {
            log.error("Произошла ошибка генерации документа : " + ex);
            throw new ReportGeneratingException(" Error in creating report: %s " + ex.getMessage(), ex.getCause());
        }
    }

}
