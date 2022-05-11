package ru.itis.javalab.dto;

import lombok.*;
import ru.itis.javalab.models.User;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class UserDto {
    private Long id;
    private String login;
    private String name;
    private String telegramAlias;
    private UUID uuid;

    public static UserDto from(User user) {
        return UserDto.builder()
                .id(user.getId())
                .login(user.getLogin())
                .name(user.getName())
                .uuid(user.getUuid())
                .telegramAlias(user.getTelegramAlias())
                .build();
    }

    public static List<UserDto> from(List<User> users) {
        return users.stream().map(UserDto::from).collect(Collectors.toList());
    }
}
