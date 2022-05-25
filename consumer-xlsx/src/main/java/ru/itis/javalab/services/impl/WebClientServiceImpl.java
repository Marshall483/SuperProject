package ru.itis.javalab.services.impl;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import ru.itis.javalab.constants.WebClientConstants;
import ru.itis.javalab.models.WebClientModel;
import ru.itis.javalab.services.WebClientService;

import java.util.List;

@Service
public class WebClientServiceImpl implements WebClientService {

    private final WebClient webClient;

    public WebClientServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl(WebClientConstants.baseDataAccessService).build();
    }

    @Override
    public List<WebClientModel> getValue(String sprintId) {
        List<WebClientModel> data = webClient.get().uri(uriBuilder -> uriBuilder.path("/api/Task/GetTasksBySprintID")
                        .queryParam("SprintId", sprintId)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<WebClientModel>>() {})
                .block();
        if (data != null) {
            System.out.println(data.size());
        } else {
            System.out.println("null список");
        }
        return data;
    }
}
