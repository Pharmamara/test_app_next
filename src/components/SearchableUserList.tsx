"use client";

import { useState } from "react";
import { Card } from "@/components/Card";

interface SearchableUserListProps {
  initialUsers: any[];
}

export function SearchableUserList({ initialUsers }: SearchableUserListProps) {
  const [search, setSearch] = useState(""); // Текущая строка поиска
  const [filteredUsers, setFilteredUsers] = useState(initialUsers); // Отфильтрованный список пользователей

  // Обновление фильтра при вводе текста
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Фильтрация на клиенте
    const filtered = initialUsers.filter((user: any) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Очистка строки поиска
  const handleClear = () => {
    setSearch("");
    setFilteredUsers(initialUsers);
  };

  return (
    <div className="p-4">
      {/* Строка поиска */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Поиск по имени..."
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300  hover:bg-gray-400 text-black rounded shadow transition font-button"
        >
          Очистить
        </button>
      </div>

      {/* Список пользователей */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user: any) => (
          <Card
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            company={user.company.name}
          />
        ))}
      </div>
    </div>
  );
}
