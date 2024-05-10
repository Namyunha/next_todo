import { FocusedTodoType, Todo } from "@/types";
import { Button, ModalFooter } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

const detailFooter = ({
  setCurrentModalState,
  onClose,
  modalTitle,
  editedState,
}: {
  setCurrentModalState: Dispatch<SetStateAction<FocusedTodoType | null>>;
  onClose: () => void;
  modalTitle: string;
  editedState: Todo | null | undefined;
}) => {
  return (
    <>
      <Button
        color="danger"
        variant="light"
        onPress={() => {
          setCurrentModalState(null);
          onClose();
        }}
      >
        닫기
      </Button>
      {modalTitle === "수정하기" ? (
        <Button
          color="primary"
          onPress={() => {
            setCurrentModalState(null);
            console.log("Edit Todo = ", editedState);
            onClose();
          }}
        >
          수정하기
        </Button>
      ) : modalTitle === "삭제하기" ? (
        <Button
          color="primary"
          onPress={() => {
            setCurrentModalState(null);
            console.log("Delete Todo = ", editedState);
            onClose();
          }}
        >
          삭제하기
        </Button>
      ) : null}
    </>
  );
};

export const ComponentFooter = ({
  setCurrentModalState,
  onClose,
  modalTitle,
  editedState,
}: {
  setCurrentModalState: Dispatch<SetStateAction<FocusedTodoType | null>>;
  onClose: () => void;
  modalTitle: string;
  editedState: Todo | null | undefined;
}) => {
  return (
    <ModalFooter>
      {detailFooter({ setCurrentModalState, onClose, modalTitle, editedState })}
    </ModalFooter>
  );
};
