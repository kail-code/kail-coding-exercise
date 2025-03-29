import React from "react";
import { useNavigate } from "react-router";
import { Modal } from "../common/Modal";
import { useSection } from "@/contexts/SectionContext";
import { assessAnswers } from "@/api/assess.api";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { answers } = useSection();

  const handleSubmit = async () => {
    console.log("Submitting answers:", answers);
    const recommendations = await assessAnswers(answers);
    console.log("Recommendations:", recommendations);
    navigate("/");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      title="Complete Assessment"
    >
      Are you sure you want to submit your answers? You won't be able to modify
      them after submission.
    </Modal>
  );
};
