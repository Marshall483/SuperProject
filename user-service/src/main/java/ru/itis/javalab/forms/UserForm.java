package ru.itis.javalab.forms;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserForm {

    private String login;
    private String password;
    private String name;
}
