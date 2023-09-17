import { Users } from "@/models/Users";

export const losDatos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users: Users[] = await res.json();
  return users;
};
