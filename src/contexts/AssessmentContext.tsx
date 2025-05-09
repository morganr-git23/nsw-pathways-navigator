
import React, { createContext, useContext, useState } from "react";
import { Question, Answer, Result, Domain, UserResponse } from "@/types/assessment";
import { calculateResults } from "@/utils/assessmentUtils";

interface AssessmentContextType {
  currentQuestionIndex: number;
  questions: Question[];
  userResponses: UserResponse[];
  results: Result | null;
  isCompleted: boolean;
  setCurrentQuestionIndex: (index: number) => void;
  answerQuestion: (questionId: string, answerId: string) => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
};

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [results, setResults] = useState<Result | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Sample questions - in production, these would be loaded from an API
  const questions: Question[] = [
    {
      id: "q1",
      text: "How comfortable are you with reading and understanding a newspaper article?",
      domain: Domain.Language,
      weight: 1.0,
      answers: [
        { id: "q1a1", text: "Very comfortable", value: 4 },
        { id: "q1a2", text: "Somewhat comfortable", value: 3 },
        { id: "q1a3", text: "A little uncomfortable", value: 2 },
        { id: "q1a4", text: "Very uncomfortable", value: 1 },
      ],
    },
    {
      id: "q2",
      text: "When given written instructions, how often do you need to ask for clarification?",
      domain: Domain.Language,
      weight: 1.0,
      answers: [
        { id: "q2a1", text: "Rarely or never", value: 4 },
        { id: "q2a2", text: "Sometimes", value: 3 },
        { id: "q2a3", text: "Often", value: 2 },
        { id: "q2a4", text: "Almost always", value: 1 },
      ],
    },
    {
      id: "q3",
      text: "How confident are you in writing a formal email or letter?",
      domain: Domain.Literacy,
      weight: 1.0,
      answers: [
        { id: "q3a1", text: "Very confident", value: 4 },
        { id: "q3a2", text: "Somewhat confident", value: 3 },
        { id: "q3a3", text: "Not very confident", value: 2 },
        { id: "q3a4", text: "Not confident at all", value: 1 },
      ],
    },
    {
      id: "q4",
      text: "How would you rate your ability to understand graphs and charts?",
      domain: Domain.Numeracy,
      weight: 1.0,
      answers: [
        { id: "q4a1", text: "Excellent", value: 4 },
        { id: "q4a2", text: "Good", value: 3 },
        { id: "q4a3", text: "Fair", value: 2 },
        { id: "q4a4", text: "Poor", value: 1 },
      ],
    },
    {
      id: "q5",
      text: "How comfortable are you performing calculations without a calculator?",
      domain: Domain.Numeracy,
      weight: 1.0,
      answers: [
        { id: "q5a1", text: "Very comfortable", value: 4 },
        { id: "q5a2", text: "Somewhat comfortable", value: 3 },
        { id: "q5a3", text: "A little uncomfortable", value: 2 },
        { id: "q5a4", text: "Very uncomfortable", value: 1 },
      ],
    },
    {
      id: "q6",
      text: "How often do you use digital devices (smartphones, computers, tablets)?",
      domain: Domain.Digital,
      weight: 1.0,
      answers: [
        { id: "q6a1", text: "Daily", value: 4 },
        { id: "q6a2", text: "Several times a week", value: 3 },
        { id: "q6a3", text: "Occasionally", value: 2 },
        { id: "q6a4", text: "Rarely or never", value: 1 },
      ],
    },
    {
      id: "q7",
      text: "How confident are you in using search engines to find information online?",
      domain: Domain.Digital,
      weight: 1.0,
      answers: [
        { id: "q7a1", text: "Very confident", value: 4 },
        { id: "q7a2", text: "Somewhat confident", value: 3 },
        { id: "q7a3", text: "Not very confident", value: 2 },
        { id: "q7a4", text: "Not confident at all", value: 1 },
      ],
    },
    {
      id: "q8",
      text: "How comfortable are you with creating and managing files on a computer?",
      domain: Domain.Digital,
      weight: 1.0,
      answers: [
        { id: "q8a1", text: "Very comfortable", value: 4 },
        { id: "q8a2", text: "Somewhat comfortable", value: 3 },
        { id: "q8a3", text: "A little uncomfortable", value: 2 },
        { id: "q8a4", text: "Very uncomfortable", value: 1 },
      ],
    },
  ];

  const answerQuestion = (questionId: string, answerId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const answer = question.answers.find(a => a.id === answerId);
    if (!answer) return;

    const existingResponseIndex = userResponses.findIndex(r => r.questionId === questionId);
    
    if (existingResponseIndex >= 0) {
      // Update existing response
      const updatedResponses = [...userResponses];
      updatedResponses[existingResponseIndex] = { questionId, answerId, value: answer.value };
      setUserResponses(updatedResponses);
    } else {
      // Add new response
      setUserResponses([...userResponses, { questionId, answerId, value: answer.value }]);
    }

    // Move to next question if not at the end
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const completeAssessment = () => {
    if (userResponses.length === 0) return;
    
    const calculatedResults = calculateResults(userResponses, questions);
    setResults(calculatedResults);
    setIsCompleted(true);
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setUserResponses([]);
    setResults(null);
    setIsCompleted(false);
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentQuestionIndex,
        questions,
        userResponses,
        results,
        isCompleted,
        setCurrentQuestionIndex,
        answerQuestion,
        completeAssessment,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};
