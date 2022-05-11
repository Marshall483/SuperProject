import * as Yup from "yup";

export const loginFormSchema = Yup.object({
  login: Yup.string()
    .email("Введите валидный email")
    .max(255)
    .required("Поле является обязательным"),
  password: Yup.string()
    .min(2, "Пароль должен иметь >2 символов")
    .max(15, "Пароль должен иметь <15 символов")
    .required("Поле является обязательным"),
});

export const registerFormSchema = loginFormSchema.shape({
  name: Yup.string()
    .min(2, "Имя должно иметь >2 символов")
    .max(15, "Имя должно иметь <15 символов")
    .required("Поле является обязательным"),
  telegramAlias: Yup.string()
    .min(2, "Имя должно иметь >2 символов")
    .max(15, "Имя должен иметь <15 символов")
    .required("Поле является обязательным"),
});
