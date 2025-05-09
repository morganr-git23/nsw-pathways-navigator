
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/Layout";
import { useAssessment } from "@/contexts/AssessmentContext";
import { Domain } from "@/types/assessment";

export default function Results() {
  const navigate = useNavigate();
  const { results, isCompleted, resetAssessment } = useAssessment();

  useEffect(() => {
    // Redirect to assessment page if no results
    if (!isCompleted || !results) {
      navigate("/assessment");
    }
  }, [isCompleted, results, navigate]);

  const handleStartOver = () => {
    resetAssessment();
    navigate("/assessment");
  };

  if (!results) {
    return null; // Will redirect due to useEffect
  }

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

  const getACSFLevelDescription = (level: number) => {
    switch (level) {
      case 1:
        return "Basic skills - may require support for complex tasks";
      case 2:
        return "Can perform familiar tasks with some independence";
      case 3:
        return "Can perform tasks independently and assists others";
      case 4:
        return "Can perform complex tasks and operations independently";
      case 5:
        return "Expert level skills - can train others and develop resources";
      default:
        return "Not assessed";
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get user email from localStorage
  const userEmail = localStorage.getItem("userEmail") || "Unknown";

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-nsw-blue">Your Assessment Results</h1>
            <p className="text-gray-600 text-lg">
              Results for: {userEmail}
            </p>
          </div>

          {/* Overall result */}
          <Card className="mb-10 border-t-4 border-nsw-blue shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Overall ACSF Level: {results.overallLevel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <div 
                  className={`w-20 h-20 rounded-full ${getLevelColor(results.overallLevel)} flex items-center justify-center text-3xl font-bold text-white`}
                >
                  {results.overallLevel}
                </div>
              </div>
              <p className="text-center text-lg mb-4">
                {results.overallLevel === 1 ? 
                  "Go back to school numpty" : 
                  results.acsf.description}
              </p>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-2 text-nsw-blue">Recommended Pathway:</h3>
                <p className="text-lg font-semibold mb-2">{results.recommendedPathway}</p>
                <p className="text-gray-700">{results.pathwayDetails}</p>
              </div>
            </CardContent>
          </Card>

          {/* Domain breakdowns */}
          <h2 className="text-2xl font-bold mb-6 text-nsw-blue">Skill Domain Breakdown</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {Object.values(Domain).map((domain) => {
              const domainScore = results.domainScores[domain];
              if (!domainScore) return null;
              
              const progressPercentage = (domainScore.score / domainScore.maxPossible) * 100;
              
              return (
                <Card key={domain} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{getDomainLabel(domain)}</span>
                      <span className={`px-3 py-1 rounded-full text-white text-sm ${getLevelColor(domainScore.level)}`}>
                        Level {domainScore.level}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Skill Level</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <p className="text-sm text-gray-600">
                        {domainScore.level === 1 ? 
                          "Needs significant improvement" : 
                          getACSFLevelDescription(domainScore.level)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Next steps */}
          <Card className="bg-gray-50 border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Based on your assessment, you may want to explore the following resources:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a
                    href="https://education.nsw.gov.au/skills-nsw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nsw-blue hover:underline"
                  >
                    Skills NSW - Find VET courses and providers
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tafensw.edu.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nsw-blue hover:underline"
                  >
                    TAFE NSW - Browse available courses
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.myskills.gov.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nsw-blue hover:underline"
                  >
                    MySkills - Compare training options
                  </a>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-4">
              <Button onClick={handleStartOver} variant="outline">
                Take Assessment Again
              </Button>
              <Link to="/">
                <Button className="bg-nsw-blue hover:bg-nsw-lightBlue">
                  Return to Home
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
