
import { Domain, Question, Result, UserResponse, DomainScore } from "@/types/assessment";

// Maps ACSF levels to descriptions
const acsfDescriptions = {
  1: "Basic skills, may require support for complex tasks",
  2: "Can perform familiar tasks with some independence",
  3: "Can perform tasks independently and assists others",
  4: "Can perform complex tasks and operations independently",
  5: "Expert level skills, can train others and develop resources"
};

// Maps ACSF levels to recommended pathways
const pathwayRecommendations = {
  1: {
    pathway: "Certificate I or II in Foundation Skills",
    details: "These courses focus on building basic skills across language, literacy, numeracy, and digital domains to prepare you for further study or employment."
  },
  2: {
    pathway: "Certificate II or III in Foundation Skills",
    details: "These courses will help you develop practical skills and confidence across LLND domains, preparing you for entry-level employment or further vocational education."
  },
  3: {
    pathway: "Certificate III or IV in your area of interest",
    details: "With your current skills, you're ready to pursue specific vocational qualifications that align with your career goals."
  },
  4: {
    pathway: "Certificate IV or Diploma qualifications",
    details: "Your strong foundation allows you to pursue advanced vocational qualifications that can lead to specialized career opportunities."
  },
  5: {
    pathway: "Diploma, Advanced Diploma, or Higher Education pathways",
    details: "Your excellent skills position you well for higher-level qualifications that can lead to professional career opportunities."
  }
};

export const calculateResults = (responses: UserResponse[], questions: Question[]): Result => {
  // Initialize domain scores
  const scores: { [key in Domain]: { score: number; count: number; maxPossible: number } } = {
    [Domain.Language]: { score: 0, count: 0, maxPossible: 0 },
    [Domain.Literacy]: { score: 0, count: 0, maxPossible: 0 },
    [Domain.Numeracy]: { score: 0, count: 0, maxPossible: 0 },
    [Domain.Digital]: { score: 0, count: 0, maxPossible: 0 }
  };
  
  // Calculate scores for each domain
  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId);
    if (question) {
      const domain = question.domain;
      scores[domain].score += response.value * question.weight;
      scores[domain].count++;
      
      // Calculate max possible score for this question (assuming 4 is max value)
      const maxValue = Math.max(...question.answers.map(a => a.value));
      scores[domain].maxPossible += maxValue * question.weight;
    }
  });

  // Calculate ACSF levels for each domain (scale of 1-5)
  const domainScores: { [key in Domain]: DomainScore } = {} as { [key in Domain]: DomainScore };
  
  Object.keys(scores).forEach(domainKey => {
    const domain = domainKey as Domain;
    const { score, count, maxPossible } = scores[domain];
    
    // Only calculate if we have responses for this domain
    if (count > 0) {
      // Calculate percentage score and map to ACSF level (1-5)
      const percentageScore = (score / maxPossible) * 100;
      let level = 1;
      
      if (percentageScore >= 90) level = 5;
      else if (percentageScore >= 75) level = 4;
      else if (percentageScore >= 60) level = 3;
      else if (percentageScore >= 40) level = 2;
      // else default level 1
      
      domainScores[domain] = {
        domain,
        score,
        level,
        maxPossible
      };
    } else {
      // No responses for this domain
      domainScores[domain] = {
        domain,
        score: 0,
        level: 0,
        maxPossible: 0
      };
    }
  });

  // Calculate overall level (average of domain levels)
  const domainLevels = Object.values(domainScores).map(d => d.level).filter(level => level > 0);
  const overallLevel = Math.round(domainLevels.reduce((sum, level) => sum + level, 0) / domainLevels.length);
  
  return {
    domainScores,
    overallLevel,
    recommendedPathway: pathwayRecommendations[overallLevel as 1|2|3|4|5].pathway,
    pathwayDetails: pathwayRecommendations[overallLevel as 1|2|3|4|5].details,
    acsf: {
      level: overallLevel,
      description: acsfDescriptions[overallLevel as 1|2|3|4|5]
    }
  };
};
