import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import {
  detailBodyContent,
  editBodyContent,
  deleteBodyContent,
} from "./modalContent";
import { FocusedTodoType } from "@/types";
import { ComponentFooter } from "./Footer";
import { useState } from "react";
import { Todo } from "@/types";

export default function OptModal({
  isOpen,
  onOpenChange,
  currentModalState,
  setCurrentModalState,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  currentModalState: null | FocusedTodoType;
  setCurrentModalState: Dispatch<SetStateAction<FocusedTodoType | null>>;
}) {
  let modalTitle: string;
  let modalBody;
  const [editedState, setEditedState] = useState<Todo | null | undefined>(
    currentModalState?.focusedTodo
  );

  useEffect(() => {
    setEditedState(currentModalState?.focusedTodo);
  }, [currentModalState?.focusedTodo]);

  console.log("editedState = ", editedState);

  switch (currentModalState?.modalType) {
    case "detail":
      modalTitle = "자세히보기";
      modalBody = detailBodyContent(currentModalState.focusedTodo);
      break;
    case "edit":
      modalTitle = "수정하기";
      modalBody = editBodyContent({ editedState, setEditedState });
      break;
    case "delete":
      modalTitle = "삭제하기";
      modalBody = deleteBodyContent(currentModalState.focusedTodo);
      break;
    default:
      modalTitle = "";
      modalBody = <div></div>;
  }

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              {modalBody}
              <ComponentFooter
                setCurrentModalState={setCurrentModalState}
                onClose={onClose}
                modalTitle={modalTitle}
                editedState={editedState}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
