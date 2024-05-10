import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "@/types";
import { Input } from "@nextui-org/input";
import { ModalBody, Switch } from "@nextui-org/react";

export const detailBodyContent = (focusedTodo: Todo | null) => {
  return (
    <>
      <ModalBody>
        <div>ID: {focusedTodo?.id}</div>
        <div>할 일: {focusedTodo?.title}</div>
        <div>완료여부: {focusedTodo?.is_done ? "✅" : "❌"}</div>
        <div>시작일: {focusedTodo?.created_at.toString()}</div>
      </ModalBody>
    </>
  );
};

export const editBodyContent = ({
  editedState,
  setEditedState,
}: {
  editedState: Todo | null | undefined;
  setEditedState: Dispatch<SetStateAction<Todo | null | undefined>>;
}) => {
  const onEditHandler = (e: string) => {
    let newEdit;
    if (editedState) {
      newEdit = { ...editedState, title: e };
    }
    setEditedState(newEdit);
  };
  return (
    <>
      <ModalBody>
        <Input
          autoFocus
          label="해야 할 일"
          placeholder="해야할 일을 입력 해주세요"
          variant="bordered"
          value={editedState?.title}
          onValueChange={onEditHandler}
        />
        <Switch
          isSelected={editedState?.is_done}
          onValueChange={(isSelected: boolean) => {
            let newEdit;
            if (editedState) {
              newEdit = { ...editedState, is_done: isSelected };
            }
            setEditedState(newEdit);
          }}
        >
          완료 여부
        </Switch>
      </ModalBody>
    </>
  );
};

export const deleteBodyContent = (focusedTodo: Todo | null) => {
  return <>{detailBodyContent(focusedTodo)}</>;
};
