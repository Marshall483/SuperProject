import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/dashboard";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/dashboard",
      query: "",
      asPath: "",
    };
  },
}));

test("Renders dashboard (index) page", () => {
  render(<Dashboard />);
});
