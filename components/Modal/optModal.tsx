import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import {
  editBodyContent,
  deleteBodyContent,
  detailBodyContent,
} from "./modalContent";

export default function OptModal({
  isOpen,
  onOpenChange,
  currentModalState,
  setCurrentModalState,
}: any) {
  let modalTitle: string;
  let modalBodyContent;

  switch (currentModalState?.modalType) {
    case "detail":
      modalTitle = "자세히보기";
      modalBodyContent = detailBodyContent(currentModalState.focusedTodo);
      break;
    case "edit":
      modalTitle = "수정하기";
      modalBodyContent = editBodyContent();
      break;
    case "delete":
      modalTitle = "삭제하기";
      modalBodyContent = deleteBodyContent();
      break;
    default:
      modalTitle = "";
      modalBodyContent = <div></div>;
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
              <ModalBody>{modalBodyContent}</ModalBody>
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
    </>
  );
}
