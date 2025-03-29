import React from "react";
import { Link } from "react-router";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-primary-900">
              Diagnostic Screener
            </h1>
            <p className="text-sm text-secondary-600">
              Your health assessment tool
            </p>
          </div>
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Home
          </Link>
        </div>
      </div>
    </header>
  );
};
