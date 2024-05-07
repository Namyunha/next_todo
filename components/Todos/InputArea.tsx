"use client";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function InputArea() {
  const router = useRouter();
  const [clickAbled, setClickAbled] = useState(true);
  const [newTodoInputValue, setNewTodoInputValue] = useState("");

  let alertTimer: NodeJS.Timeout;
  const onInputHandler = (word: string) => {
    clearTimeout(alertTimer);
    setClickAbled(false);
    alertTimer = setTimeout(() => {
      setClickAbled(true);
      setNewTodoInputValue(word);
    }, 1000);
  };

  const addTodo = async () => {
    if (!newTodoInputValue) return;
    console.log("newTodoInputValue = ", newTodoInputValue);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ title: newTodoInputValue }),
      }
    );
    console.log("response = ", response);
    if (response) {
      router.refresh();
    }
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input onValueChange={onInputHandler} label="새로운 할 일" />
      <Popover placement="top" offset={20} showArrow>
        <PopoverTrigger>
          <Button
            isDisabled={!clickAbled}
            className="h-14"
            color={newTodoInputValue.length > 0 ? "warning" : "default"}
            onClick={() => addTodo()}
          >
            추가
          </Button>
        </PopoverTrigger>
        {newTodoInputValue.length === 0 && (
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">👊</div>
              <div className="text-tiny">할 일을 입력해주세요</div>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
