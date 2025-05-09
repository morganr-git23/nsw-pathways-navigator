
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Layout } from "@/components/Layout";
import { BookOpen, ExternalLink } from "lucide-react";

const resources = [
  {
    id: "r1",
    title: "TAFE NSW",
    description: "Offers a wide range of courses and qualifications across NSW, with flexible study options including online, part-time, and full-time.",
    url: "https://www.tafensw.edu.au/",
    category: "Training Provider",
    details: "TAFE NSW is Australia's largest training provider offering over 1,200 courses. They provide practical, hands-on training with industry connections and support services for students."
  },
  {
    id: "r2",
    title: "Smart and Skilled",
    description: "NSW Government program that helps eligible people in NSW get the skills they need through subsidized training.",
    url: "https://smartandskilled.nsw.gov.au/",
    category: "Government Program",
    details: "Smart and Skilled provides eligible students with an entitlement to government-subsidized training up to and including Certificate III level, and government funding for higher-level courses."
  },
  {
    id: "r3",
    title: "MySkills",
    description: "Australia's national directory of vocational education and training (VET) organizations and courses.",
    url: "https://www.myskills.gov.au/",
    category: "Course Finder",
    details: "MySkills helps you search for and compare VET courses and training providers. You can find information about course costs, delivery methods, and employment outcomes."
  },
  {
    id: "r4",
    title: "Reading Writing Hotline",
    description: "A free national referral service for adults seeking English language, literacy, and numeracy support.",
    url: "https://www.readingwritinghotline.edu.au/",
    category: "Support Service",
    details: "The Reading Writing Hotline helps adults find local literacy and numeracy classes, provides information about courses, and assists with accessing appropriate learning resources."
  },
  {
    id: "r5",
    title: "Skills NSW",
    description: "Provides information on vocational training opportunities, apprenticeships, and traineeships in NSW.",
    url: "https://education.nsw.gov.au/skills-nsw",
    category: "Government Resource",
    details: "Skills NSW works with industry, training providers, and other stakeholders to develop and implement strategies that meet the state's current and future skills needs."
  },
  {
    id: "r6",
    title: "Australian Apprenticeships",
    description: "Information about combining employment and structured training to gain a nationally recognized qualification.",
    url: "https://www.australianapprenticeships.gov.au/",
    category: "Career Pathway",
    details: "Australian Apprenticeships provide guidance on how to become an apprentice or trainee, find employers, and understand the financial incentives and support available."
  }
];

export default function Resources() {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-nsw-blue">VET Resources in NSW</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Connect with these resources to help you find and enroll in the right vocational education and training opportunities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-10">
            {resources.map((resource) => (
              <HoverCard key={resource.id}>
                <HoverCardTrigger asChild>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{resource.title}</CardTitle>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nsw-blue text-white">
                          {resource.category}
                        </span>
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-nsw-blue">
                        <BookOpen className="mr-2" size={16} />
                        <span className="text-sm">Hover for more details</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-nsw-blue hover:bg-nsw-lightBlue"
                        asChild
                      >
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Visit Website
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{resource.title}</h4>
                    <p className="text-sm">{resource.details}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-xl font-bold mb-3 text-nsw-blue">Need Additional Help?</h2>
            <p className="mb-4">
              If you need assistance finding the right course or understanding your options, 
              you can contact your local TAFE campus or visit the Skills NSW website for personalized advice.
            </p>
            <Button 
              variant="outline" 
              className="text-nsw-blue"
              asChild
            >
              <a 
                href="https://education.nsw.gov.au/skills-nsw/contact-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Contact Skills NSW
                <ExternalLink size={16} />
              </a>
            </Button>
          </div>

          <div className="flex justify-between">
            <Link to="/pathways">
              <Button variant="outline">Back to Pathways</Button>
            </Link>
            <Link to="/assessment">
              <Button className="bg-nsw-blue hover:bg-nsw-lightBlue">Take Assessment Again</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
