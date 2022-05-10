package ru.itis.javalab.services;

import ru.itis.javalab.models.WebClientModel;

import java.util.List;

public interface WebClientService {
    List<WebClientModel> getValue(String sprintId);
}
