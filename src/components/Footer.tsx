
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <p className="text-gray-500 text-sm">
              © 2025 NSW LLND Pathways Navigator. All rights reserved.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-center md:text-right text-sm text-gray-500">
              <Link to="/privacy" className="underline hover:text-nsw-blue">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link to="/terms" className="underline hover:text-nsw-blue">
                Terms of Use
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-4 text-center md:text-left">
          <p className="text-xs text-gray-500">
            This tool is designed to provide general guidance only. For personalized education advice,
            please consult with an education professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
