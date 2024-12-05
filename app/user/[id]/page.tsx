"use client"; // Указываем, что это клиентский компонент

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "../../../styles/globals.css";

const UserPage = () => {
  const params = useParams(); // Достаем параметры маршрута
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // загружаем данные
    const fetchUser = async () => {
      try {
        setLoading(true);
        if (!params?.id) throw new Error("Нет ID");
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${params.id}`
        );
        if (!res.ok) throw new Error("Пользователь не найден");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        router.push("/"); // Редирект на главную в случае ошибки
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params?.id, router]);

  if (loading) return <p>Загрузка...</p>;
  if (!user) return <p>Пользователь не найден</p>;

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-500 hover:text-white transition"
      >
        НАЗАД
      </button>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Address:</strong> {user.address.street}, {user.address.city}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
    </div>
  );
};

export default UserPage;
