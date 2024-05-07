"use client";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

export default function InputArea() {
  const [clickAbled, setClickAbled] = useState(true);
  const [newTodoInputValue, setNewTodoInputValue] = useState("");
  let alertTimer: NodeJS.Timeout;
  const onInputHandler = (word: string) => {
    clearTimeout(alertTimer);
    setClickAbled(false);
    alertTimer = setTimeout(() => {
      setClickAbled(true);
      console.log("word = ", word);
      setNewTodoInputValue(word);
    }, 1000);
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
