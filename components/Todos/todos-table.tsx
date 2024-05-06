"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Todo } from "@/types";

function TodosRow({ todo }: { todo: Todo }) {
  return (
    <TableRow key={todo.id}>
      <TableCell>{todo.id.slice(0, 4)}</TableCell>
      <TableCell>{todo.title}</TableCell>
      <TableCell>{todo.is_done ? "✅" : "❌"}</TableCell>
      <TableCell>{todo.created_at.toString()}</TableCell>
    </TableRow>
  );
}

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="text-center">ID</TableColumn>
        <TableColumn className="text-center">할 일</TableColumn>
        <TableColumn className="text-center">상 태</TableColumn>
        <TableColumn className="text-center">날 짜</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"보여줄 데이터가 없습니다."}>
        {todos &&
          todos.map((todo: Todo) =>
            // <TableRow key={todo.id}>
            //   <TableCell>{todo.id.slice(0, 4)}</TableCell>
            //   <TableCell>{todo.title}</TableCell>
            //   <TableCell>{todo.is_done ? "완료" : "미완료"}</TableCell>
            //   <TableCell>{todo.created_at.toString()}</TableCell>
            // </TableRow>
            TodosRow({ todo })
          )}
      </TableBody>
    </Table>
  );
};

export default TodosTable;
