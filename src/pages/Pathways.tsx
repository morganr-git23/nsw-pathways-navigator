
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { useAssessment } from "@/contexts/AssessmentContext";
import { GraduationCap, BookOpen, ChevronRight } from "lucide-react";

// Sample courses data - would ideally come from a database or API
const courses = {
  1: [
    {
      id: "c1",
      title: "Certificate I in Foundation Skills",
      provider: "TAFE NSW",
      description: "Develop basic skills in reading, writing, numeracy, and digital literacy.",
      link: "https://www.tafensw.edu.au/"
    },
    {
      id: "c2",
      title: "Certificate I in Access to Work and Training",
      provider: "Various RTOs",
      description: "Build confidence and skills needed to enter the workforce or further training.",
      link: "https://www.myskills.gov.au/"
    }
  ],
  2: [
    {
      id: "c3",
      title: "Certificate II in Skills for Work and Vocational Pathways",
      provider: "TAFE NSW",
      description: "Develop employability skills and prepare for entry-level positions or further study.",
      link: "https://www.tafensw.edu.au/"
    },
    {
      id: "c4",
      title: "Certificate II in Business",
      provider: "Various RTOs",
      description: "Gain practical skills for administrative and clerical roles in business environments.",
      link: "https://www.myskills.gov.au/"
    }
  ],
  3: [
    {
      id: "c5",
      title: "Certificate III in Business",
      provider: "TAFE NSW",
      description: "Develop skills for a range of business and administrative roles.",
      link: "https://www.tafensw.edu.au/"
    },
    {
      id: "c6",
      title: "Certificate III in Individual Support",
      provider: "Various RTOs",
      description: "Prepare for roles in aged care, disability support, or community services.",
      link: "https://www.myskills.gov.au/"
    }
  ],
  4: [
    {
      id: "c7",
      title: "Certificate IV in Business",
      provider: "TAFE NSW",
      description: "Develop advanced skills for supervisory and management roles.",
      link: "https://www.tafensw.edu.au/"
    },
    {
      id: "c8",
      title: "Certificate IV in Training and Assessment",
      provider: "Various RTOs",
      description: "Learn to design and deliver training in vocational education settings.",
      link: "https://www.myskills.gov.au/"
    }
  ],
  5: [
    {
      id: "c9",
      title: "Diploma of Business",
      provider: "TAFE NSW",
      description: "Gain specialized knowledge for business management and planning roles.",
      link: "https://www.tafensw.edu.au/"
    },
    {
      id: "c10",
      title: "Diploma of Leadership and Management",
      provider: "Various RTOs",
      description: "Develop advanced leadership and management skills for a range of industries.",
      link: "https://www.myskills.gov.au/"
    }
  ]
};

export default function Pathways() {
  const navigate = useNavigate();
  const { results, isCompleted } = useAssessment();
  const [activeTab, setActiveTab] = useState<string>("recommended");
  
  // Redirect if no assessment results
  if (!isCompleted) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6 text-nsw-blue">Educational Pathways</h1>
            <p className="text-lg mb-8">
              Please complete the assessment first to receive personalized pathway recommendations.
            </p>
            <Link to="/assessment">
              <Button className="bg-nsw-blue hover:bg-nsw-lightBlue">
                Take Assessment
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Define user level or use a default
  const userLevel = results?.overallLevel || 3;
  
  // Get recommended courses for user level
  const recommendedCourses = courses[userLevel as keyof typeof courses] || [];
  
  // Get all courses flattened
  const allCourses = Object.values(courses).flat();

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-nsw-blue">Your Educational Pathways</h1>
            <p className="text-gray-600 text-lg mb-6">
              Based on your ACSF Level {userLevel} assessment results
            </p>
          </div>

          <Card className="mb-8 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-nsw-blue">
                <GraduationCap />
                Recommended Pathway
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-gray-50 p-6 border border-gray-100">
                <h3 className="text-xl font-semibold mb-2">{results?.recommendedPathway}</h3>
                <p className="text-gray-700">{results?.pathwayDetails}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recommended">Recommended Courses</TabsTrigger>
              <TabsTrigger value="all">Browse All Courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended">
              <div className="grid gap-6 mt-4">
                {recommendedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gray-50 border-b">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium text-nsw-blue mb-1">
                        Provider: {course.provider}
                      </p>
                      <p className="text-gray-700">
                        {course.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-gray-50 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1 text-nsw-blue"
                        asChild
                      >
                        <a href={course.link} target="_blank" rel="noopener noreferrer">
                          Learn more <ChevronRight size={16} />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all">
              <div className="grid gap-6 mt-4">
                {allCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gray-50 border-b">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium text-nsw-blue mb-1">
                        Provider: {course.provider}
                      </p>
                      <p className="text-gray-700">
                        {course.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-gray-50 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1 text-nsw-blue"
                        asChild
                      >
                        <a href={course.link} target="_blank" rel="noopener noreferrer">
                          Learn more <ChevronRight size={16} />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={() => navigate('/results')}
            >
              Back to Results
            </Button>
            <Button
              className="bg-nsw-blue hover:bg-nsw-lightBlue"
              onClick={() => navigate('/resources')}
            >
              Explore Resources
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
