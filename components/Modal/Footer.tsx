import { FocusedTodoType, Todo } from "@/types";
import { Button, ModalFooter } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

function DetailFooter({
  setCurrentModalState,
  onClose,
  modalTitle,
  editedState,
}: {
  setCurrentModalState: Dispatch<SetStateAction<FocusedTodoType | null>>;
  onClose: () => void;
  modalTitle: string;
  editedState: Todo | null | undefined;
}) {
  const router = useRouter();
  const onEditHandler = async () => {
    await fetch(`http://localhost:3000/api/todos/${editedState?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(editedState),
    });
    router.refresh();
    setCurrentModalState(null);
    onClose();
  };

  const onDeleteHandler = async () => {
    await fetch(`http://localhost:3000/api/todos/${editedState?.id}`, {
      method: "DELETE",
    });
    router.refresh();
    setCurrentModalState(null);
    onClose();
  };

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
        <Button color="primary" onPress={onEditHandler}>
          수정하기
        </Button>
      ) : modalTitle === "삭제하기" ? (
        <Button color="primary" onPress={onDeleteHandler}>
          삭제하기
        </Button>
      ) : null}
    </>
  );
}

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
      {DetailFooter({ setCurrentModalState, onClose, modalTitle, editedState })}
    </ModalFooter>
  );
};
