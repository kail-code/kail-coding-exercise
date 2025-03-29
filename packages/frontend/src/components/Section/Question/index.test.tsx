import { render, screen, fireEvent } from "@testing-library/react";
import { Question } from "./index";
import { useSection } from "@/contexts/SectionContext";
import { useParams } from "react-router";
import { useRouteLoaderData } from "react-router";

// Mock react-router hooks
jest.mock("react-router", () => ({
  useParams: jest.fn(),
  useRouteLoaderData: jest.fn(),
}));

// Mock SectionContext
jest.mock("@/contexts/SectionContext", () => ({
  useSection: jest.fn(),
}));

describe("Question", () => {
  const useSectionMock = jest.mocked(useSection);
  const mockQuestion = {
    question_id: "q1",
    title: "Test Question",
  };

  const mockData = {
    content: {
      sections: [
        {
          answers: [
            { value: 1, title: "Option 1" },
            { value: 2, title: "Option 2" },
          ],
          questions: [mockQuestion],
        },
      ],
    },
  };

  const mockGetAnswer = jest.fn();
  const mockAddAnswer = jest.fn();
  const mockUpdateAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({
      sectionIndex: "1",
      questionId: "q1",
    });
    (useRouteLoaderData as jest.Mock).mockReturnValue(mockData);
    useSectionMock.mockReturnValue({
      getAnswer: mockGetAnswer,
      addAnswer: mockAddAnswer,
      updateAnswer: mockUpdateAnswer,
    } as any);
  });

  it("renders question title", () => {
    render(<Question />);

    expect(screen.getByText("Test Question")).toBeInTheDocument();
  });

  it("renders button options for single type question", () => {
    render(<Question />);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("calls addAnswer when selecting a single option", () => {
    render(<Question />);

    fireEvent.click(screen.getByText("Option 1"));
    expect(mockAddAnswer).toHaveBeenCalledWith("q1", 1);
  });

  it("calls updateAnswer when selecting a single option", () => {
    mockGetAnswer.mockReturnValue(1);
    render(<Question />);

    fireEvent.click(screen.getByText("Option 1"));
    expect(mockUpdateAnswer).toHaveBeenCalledWith("q1", 1);
  });
});
