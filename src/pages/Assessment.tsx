import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { useAssessment } from "@/contexts/AssessmentContext";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Assessment() {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    questions,
    userResponses,
    answerQuestion,
    completeAssessment,
    isCompleted,
    setCurrentQuestionIndex,
  } = useAssessment();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  // If assessment is already completed, redirect to results
  useEffect(() => {
    if (isCompleted) {
      navigate("/results");
    }
  }, [isCompleted, navigate]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Check if user has already answered this question
  useEffect(() => {
    const existingResponse = userResponses.find(
      (r) => r.questionId === currentQuestion?.id
    );
    if (existingResponse) {
      setSelectedAnswer(existingResponse.answerId);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentQuestion, userResponses]);

  const handleAnswerSelection = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer && currentQuestion) {
      answerQuestion(currentQuestion.id, selectedAnswer);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCompleteAssessment = () => {
    if (selectedAnswer && currentQuestion) {
      answerQuestion(currentQuestion.id, selectedAnswer);
      setShowContactForm(true); // Show contact form instead of completing
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // Store user contact info (in a real app, you would save it to a database)
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    
    // Complete assessment and navigate to results
    completeAssessment();
    navigate("/results");
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const getDomainLabel = (domain: string) => {
    switch (domain) {
      case "language":
        return "Language";
      case "literacy":
        return "Literacy";
      case "numeracy":
        return "Numeracy";
      case "digital":
        return "Digital Literacy";
      default:
        return domain;
    }
  };

  if (showContactForm) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Almost Done!</CardTitle>
                <CardDescription>
                  Please provide your contact information to view your assessment results
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleContactSubmit}>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      We'll use this to send you your results and additional resources.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full justify-between">
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={() => setShowContactForm(false)}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="bg-nsw-accent hover:bg-red-700">
                      Submit & View Results
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-nsw-blue">
            LLND Skills Assessment
          </h1>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-200" />
          </div>

          {currentQuestion && (
            <Card className="shadow-md">
              <CardHeader>
                <div className="inline-block bg-nsw-blue text-white px-3 py-1 text-xs rounded-full mb-2">
                  {getDomainLabel(currentQuestion.domain)}
                </div>
                <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
                <CardDescription>
                  Select the option that best describes your ability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={handleAnswerSelection}
                  className="space-y-4"
                >
                  {currentQuestion.answers.map((answer) => (
                    <div key={answer.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value={answer.id} id={answer.id} />
                      <Label htmlFor={answer.id} className="flex-grow cursor-pointer font-normal">
                        {answer.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={isFirstQuestion}
                >
                  Previous
                </Button>

                {isLastQuestion ? (
                  <Button
                    onClick={handleCompleteAssessment}
                    disabled={!selectedAnswer}
                    className="bg-nsw-accent hover:bg-red-700"
                  >
                    Complete Assessment
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="bg-nsw-blue hover:bg-nsw-lightBlue"
                  >
                    Next Question
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
