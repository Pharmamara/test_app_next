import { SearchableUserList } from "@/components/SearchableUserList";

export const metadata = {
  title: "Список пользователей",
  description: "Главная страница с пользователями, отрисована на сервере",
};

// Функция для получения пользователей
async function fetchUsers() {
  const res = await fetch("http://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Ошибка при загрузке пользователей");
  }
  return res.json(); // Возвращаем полный список пользователей
}

export default async function HomePage() {
  const users = await fetchUsers(); // Серверный рендеринг пользователей

  return <SearchableUserList initialUsers={users} />;
}
