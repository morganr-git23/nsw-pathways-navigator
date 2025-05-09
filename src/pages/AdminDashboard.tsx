
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated as admin
    if (!authState.isAuthenticated || !authState.isAdmin) {
      navigate("/admin/login");
    }
  }, [authState, navigate]);

  if (!authState.isAuthenticated || !authState.isAdmin) {
    return null; // Will redirect due to useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-nsw-blue">Admin Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Manage assessment questions and settings
          </p>

          <Tabs defaultValue="questions">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="questions">Questions Management</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="questions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Questions</CardTitle>
                  <CardDescription>
                    Add, edit, or remove questions from the assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    In this section, you can manage all questions in the assessment. You can adjust question weightings,
                    modify answer options, or create entirely new questions.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-800">
                      <strong>Note:</strong> In this demo version, question management is view-only. In the full version, 
                      you would be able to edit questions and save changes to a database.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-nsw-blue hover:bg-nsw-lightBlue">
                    Manage Questions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendation Settings</CardTitle>
                  <CardDescription>
                    Configure how assessment scores map to recommended pathways
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Here you can adjust how assessment scores are mapped to ACSF levels and how those levels 
                    determine recommended educational pathways.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-800">
                      <strong>Note:</strong> In this demo version, recommendation settings are view-only. In the full version, 
                      you would be able to edit mapping logic and save changes to a database.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-nsw-blue hover:bg-nsw-lightBlue">
                    Edit Recommendations
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure general application settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Configure system settings including user permissions, notification preferences,
                    and database connections.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-800">
                      <strong>Note:</strong> In this demo version, system settings are view-only. In the full version, 
                      you would be able to modify settings and save changes to a database.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-nsw-blue hover:bg-nsw-lightBlue">
                    Update Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
