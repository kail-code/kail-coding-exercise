import { Link } from "react-router";

export const Home = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-primary-900">Welcome</h1>
          <p className="text-secondary-700 text-lg mb-6">
            We'd like to understand how you've been feeling lately. Your answers
            will help us provide the best support for you.
          </p>
          <p className="text-secondary-600 mb-8">
            This brief questionnaire will take about 5 minutes to complete.
            Please answer each question as honestly as you can.
          </p>
          <Link
            to="/section/1/questions"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Answer Questions
          </Link>
        </div>
      </div>
    </div>
  );
};
