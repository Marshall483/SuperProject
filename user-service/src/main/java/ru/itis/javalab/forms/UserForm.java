package ru.itis.javalab.forms;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserForm {

    private String login;
    private String password;
    private String name;
}
