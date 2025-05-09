
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { authState, logout } = useAuth();

  return (
    <nav className="bg-nsw-blue shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">NSW LLND Pathways Navigator</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-nsw-lightBlue px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/assessment" className="text-white hover:bg-nsw-lightBlue px-3 py-2 rounded-md text-sm font-medium">
              Start Assessment
            </Link>
            {!authState.isAuthenticated ? (
              <Link to="/admin/login">
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-nsw-lightBlue">
                  Admin Login
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/admin/dashboard" className="text-white hover:bg-nsw-lightBlue px-3 py-2 rounded-md text-sm font-medium">
                  Admin Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  className="bg-transparent text-white border-white hover:bg-nsw-lightBlue"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
