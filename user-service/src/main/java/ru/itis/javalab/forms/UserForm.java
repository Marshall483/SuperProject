package ru.itis.javalab.forms;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserForm {
    private String login;
    private String password;
    private String name;
    private String telegramAlias;
}
