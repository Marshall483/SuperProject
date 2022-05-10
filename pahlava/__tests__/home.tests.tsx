import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/index";

test("Renders registration (index) page", () => {
  render(<Home />);
  expect(screen.getByText(/Регистрация/i, { selector: 'h4' })).toBeInTheDocument();
  expect(screen.getByLabelText(/почта/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
});

test("Switch to login works", () => {
    render(<Home />);
    expect(screen.queryByText(/Вход в систему/i, { selector: 'h4' })).toBeNull();
    fireEvent.click(screen.getByText(/Вход/i, {selector: 'a'}))
    expect(screen.getByText(/Вход в систему/i, { selector: 'h4' })).toBeInTheDocument();
});