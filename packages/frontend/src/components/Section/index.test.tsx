import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Section } from "./index";
import { useRouteLoaderData, useNavigate, useParams } from "react-router";
import { ProgressBar } from "../common/ProgressBar";
import { SubmitModal } from "./SubmitModal";
import * as contextModule from "@/contexts/SectionContext";

jest.mock("react-router", () => ({
  useRouteLoaderData: jest.fn(),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  Outlet: () => <div data-testid="mock-outlet">Mock Outlet</div>,
}));

jest.mock("./SubmitModal", () => ({
  SubmitModal: jest.fn(),
}));

jest.mock("../common/ProgressBar", () => ({
  ProgressBar: jest.fn(),
}));

describe("Section", () => {
  const useNavigateMock = jest.mocked(useNavigate);
  const useRouteLoaderDataMock = jest.mocked(useRouteLoaderData);
  const useParamsMock = jest.mocked(useParams);
  const mockNavigate = jest.fn();
  const ProgressBarMock = jest.mocked(ProgressBar);
  const SubmitModalMock = jest.mocked(SubmitModal);

  const mockData = {
    content: {
      display_name: "Test Screener",
      sections: [
        {
          title: "Test Section",
          questions: [
            { question_id: "q1", title: "Question 1" },
            { question_id: "q2", title: "Question 2" },
          ],
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigateMock.mockReturnValue(mockNavigate);
    useRouteLoaderDataMock.mockReturnValue(mockData);
  });

  it("renders section title and progress bar", () => {
    useParamsMock.mockReturnValue({
      sectionIndex: "1",
      questionId: "q1",
    });

    render(<Section />);

    expect(screen.getByText("Test Screener")).toBeInTheDocument();
    expect(screen.getByText("Test Section")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
    expect(ProgressBarMock).toHaveBeenCalledWith({ current: 1, total: 2 }, {});
  });

  it("disables Previous button on first question", () => {
    useParamsMock.mockReturnValue({
      sectionIndex: "1",
      questionId: "q1",
    });

    render(<Section />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("enables Previous button on subsequent questions", () => {
    useParamsMock.mockReturnValue({
      sectionIndex: "1",
      questionId: "q2",
    });

    render(<Section />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).not.toBeDisabled();
  });

  it("navigates to previous question when Previous button is clicked", async () => {
    useParamsMock.mockReturnValue({
      sectionIndex: "1",
      questionId: "q2",
    });

    render(<Section />);

    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/section/1/questions/q1");
  });

  it("shows submit modal on last question", async () => {
    const SectionProviderMock = jest
      .spyOn(contextModule, "SectionProvider")
      .mockImplementation(({ children }) => {
        return <div data-testid="section-context">{children}</div>;
      });
    useParamsMock.mockReturnValue({
      sectionIndex: "1",
      questionId: "q2",
    });

    render(<Section />);

    await act(async () => {
      (SectionProviderMock as any).mock.calls[0][0].onAnswerChange();
    });

    expect(SubmitModalMock).toHaveBeenCalledWith(
      { isOpen: true, onClose: expect.any(Function) },
      {}
    );
  });
});
