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
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Todo } from "@/types";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import OptModal from "../Modal/optModal";
import { useState } from "react";
import { FocusedTodoType, CustomModalType } from "@/types";

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentModalState, setCurrentModalState] =
    useState<FocusedTodoType | null>(null);
  console.log("currentModalState = ", currentModalState);
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {currentModalState?.modalType}
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setCurrentModalState(null);
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setCurrentModalState(null);
                    onClose();
                  }}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="text-center">ID</TableColumn>
          <TableColumn className="text-center">할 일</TableColumn>
          <TableColumn className="text-center">상 태</TableColumn>
          <TableColumn className="text-center">날 짜</TableColumn>
          <TableColumn className="text-center">설 정</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"보여줄 데이터가 없습니다."}>
          {todos &&
            todos.map((todo: Todo) => (
              <TableRow key={todo.id}>
                <TableCell className="text-center">
                  {todo.id.slice(0, 4)}
                </TableCell>
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
                        <Button
                          isIconOnly
                          radius="full"
                          size="sm"
                          variant="light"
                        >
                          <VerticalDotsIcon className="text-default-400" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        onAction={(key) => {
                          setCurrentModalState({
                            focusedTodo: todo,
                            modalType: key as CustomModalType,
                          });
                          onOpen();
                        }}
                      >
                        <DropdownItem key="detail">상세보기</DropdownItem>
                        <DropdownItem key="update">수정</DropdownItem>
                        <DropdownItem key="delete">삭제</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TodosTable;
