"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { Todo } from "@/types";
import { VerticalDotsIcon } from "./VerticalDotsIcon";

function TodosRow({ todo }: { todo: Todo }) {
  return (
    <TableRow key={todo.id}>
      <TableCell className="text-center">{todo.id.slice(0, 4)}</TableCell>
      <TableCell className="text-center">{todo.title}</TableCell>
      <TableCell className="text-center">
        {todo.is_done ? "✅" : "❌"}
      </TableCell>
      <TableCell className="text-center">
        {todo.created_at.toString()}
      </TableCell>
      <TableCell className="text-center">
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown className="bg-background border-1 border-default-200">
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <VerticalDotsIcon className="text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>View</DropdownItem>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </TableCell>
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
        <TableColumn className="text-center">설 정</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"보여줄 데이터가 없습니다."}>
        {todos && todos.map((todo: Todo) => TodosRow({ todo }))}
      </TableBody>
    </Table>
  );
};

export default TodosTable;
