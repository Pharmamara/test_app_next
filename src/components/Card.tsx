import React from "react";

interface CardProps {
  name: string;
  email: string;
  company: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ name, email, company, onClick }) => {
  return (
    <div
      className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition-card"
      onClick={onClick}
    >
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-500">{company}</p>
    </div>
  );
};

const CardSkeleton: React.FC = () => {
  return (
    <div className="border p-4 rounded shadow animate-pulse transition-skeleton">
      <div className="h-6 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export { Card, CardSkeleton };
