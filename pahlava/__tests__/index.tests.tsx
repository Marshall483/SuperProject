import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/index";

test("Renders login (index) page", () => {
  render(<Home />);
  expect(screen.getByText(/Вход в систему/i, { selector: 'h4' })).toBeInTheDocument();
  expect(screen.getByLabelText(/почта/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
});

test("Switch to register works", () => {
    render(<Home />);
    expect(screen.queryByText(/Регистрация/i, { selector: 'h4' })).toBeNull();
    fireEvent.click(screen.getByText(/Регистрация/i, {selector: 'a'}))
    expect(screen.getByText(/Регистрация/i, { selector: 'h4' })).toBeInTheDocument();
});