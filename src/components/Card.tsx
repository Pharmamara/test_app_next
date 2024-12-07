import Link from "next/link";
import React from "react";

interface CardProps {
  name: string;
  email: string;
  company: string;
  id: number;
}

const Card: React.FC<CardProps> = ({ name, email, company, id }) => {
  return (
    <div className="border p-4 rounded shadow hover:bg-gray-100 transition">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-500">{company}</p>
      <Link href={`/user/${id}`}>
        <button className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-500 hover:text-white transition">
          Подробнее
        </button>
      </Link>
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
