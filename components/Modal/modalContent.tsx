import React from "react";
import { Todo } from "@/types";

export const detailBodyContent = (focusedTodo: Todo) => {
  return (
    <>
      <div>ID: {focusedTodo.id}</div>
      <div>할 일: {focusedTodo.title}</div>
      <div>완료여부: {focusedTodo.is_done ? "✅" : "❌"}</div>
      <div>시작일: {focusedTodo.created_at.toString()}</div>
    </>
  );
};
export const editBodyContent = () => {
  return <div>수정하기</div>;
};
export const deleteBodyContent = () => {
  return <div>삭제하기</div>;
};
