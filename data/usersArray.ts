import type { User } from '../interfaces/types';

export let users: User[] = [
  {
    id: 1,
    name: "Daniel Silva",
    email: "daniel@example.com",
    password: "$2a$10$/VgjFibJQzugLRmH3ZBb7O2Ol8lKct9WvLMd.WdVFhoQ.EsRkh6.K", // 10 salt rounds
  },
  {
    id: 2,
    name: "Maria Torres",
    email: "maria@example.com",
    password: "$2a$10$a..xVpSylc1gKmnRPJtjDuaewpwSh1V/0IoaZFUH.8faX655ZFNvm", // 10 salt rounds
  },
  {
    id: 3,
    name: "Alex Rivera",
    email: "alex@example.com",
    password: "$2a$10$XlAWVK65vLXga7iEJASV3eiXRPGsKZl5.mGfkWywC4xsQZ4y0Knze", // 10 salt rounds
  },
];
