
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { 
  GraduationCap, 
  BookOpen, 
  ListCheck, 
  Users 
} from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-nsw-blue to-nsw-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Discover Your Perfect Learning Pathway
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in">
            Take our assessment to find the right vocational education and training path 
            based on your language, literacy, numeracy, and digital skills.
          </p>
          <Link to="/assessment">
            <Button className="bg-nsw-accent hover:bg-red-700 text-white px-8 py-6 text-lg rounded-md">
              Start Your Assessment
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-nsw-blue">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto w-16 h-16 bg-nsw-blue rounded-full flex items-center justify-center mb-4">
                <ListCheck className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-nsw-blue">1. Complete Assessment</h3>
              <p className="text-gray-600">
                Answer questions about your language, literacy, numeracy, and digital skills.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto w-16 h-16 bg-nsw-blue rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-nsw-blue">2. Review Results</h3>
              <p className="text-gray-600">
                Get a detailed breakdown of your skills aligned with the Australian Core Skills Framework.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto w-16 h-16 bg-nsw-blue rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-nsw-blue">3. Explore Pathways</h3>
              <p className="text-gray-600">
                Receive tailored recommendations for VET courses based on your skill profile.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto w-16 h-16 bg-nsw-blue rounded-full flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-nsw-blue">4. Connect with Resources</h3>
              <p className="text-gray-600">
                Access information about NSW VET providers offering your recommended courses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About ACSF Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-nsw-blue text-center">About the Australian Core Skills Framework</h2>
            <p className="text-lg text-gray-700 mb-6">
              The Australian Core Skills Framework (ACSF) provides a consistent national approach to identifying and developing 
              language, literacy and numeracy (LLN) skills. This assessment uses principles from the ACSF to help identify 
              your current skill level and recommend appropriate education pathways.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              ACSF levels range from 1 (basic skills) to 5 (highly specialized skills), covering various domains including 
              reading, writing, oral communication, numeracy, and digital literacy.
            </p>
            <div className="text-center">
              <Link to="/assessment">
                <Button className="bg-nsw-blue hover:bg-nsw-lightBlue text-white px-6 py-3">
                  Start Assessment Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
