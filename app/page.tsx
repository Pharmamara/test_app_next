/*"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios.get("http://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <input
        type="text"
        placeholder="Начните ввод имени пользователя..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            name={user.name}
            email={user.email}
            company={user.company.name}
            onClick={() => router.push(`/user/${user.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;*/

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardSkeleton } from "@/components/Card";
import "../styles/globals.css";

const HomePage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Обновляем список пользователей на основе поиска
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter((user) => user.name.toLowerCase().includes(query))
      );
    }
  }, [searchQuery, users]);

  // Очистка поля поиска
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Список пользователей</h1>

      {/* Поле поиска */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по имени..."
          className="border p-2 rounded w-full"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Очистить
          </button>
        )}
      </div>

      {/* Список пользователей */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => <CardSkeleton key={index} />)
          : filteredUsers.map((user) => (
              <Card
                key={user.id}
                name={user.name}
                email={user.email}
                company={user.company.name}
                onClick={() => router.push(`/user/${user.id}`)} // Переход по клику
              />
            ))}
      </div>
    </div>
  );
};

export default HomePage;
