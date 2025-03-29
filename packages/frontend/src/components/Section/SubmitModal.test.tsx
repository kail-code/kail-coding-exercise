import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SectionProvider } from "@/contexts/SectionContext";
import { useNavigate } from "react-router";
import { SubmitModal } from "./SubmitModal";

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

describe("SubmitModal", () => {
  const useNavigateMock = jest.mocked(useNavigate);
  const mockOnClose = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigateMock.mockReturnValue(mockNavigate);
  });

  const renderWithContext = (ui: React.ReactElement) => {
    return render(
      <SectionProvider onAnswerChange={jest.fn()}>{ui}</SectionProvider>
    );
  };

  it("renders when isOpen is true", () => {
    renderWithContext(<SubmitModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("Complete Assessment")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Are you sure you want to submit your answers? You won't be able to modify them after submission."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    renderWithContext(<SubmitModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText("Complete Assessment")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Are you sure you want to submit your answers? You won't be able to modify them after submission."
      )
    ).not.toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    renderWithContext(<SubmitModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("navigates to home and logs answers when Submit button is clicked", () => {
    renderWithContext(<SubmitModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
