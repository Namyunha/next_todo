"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";

export default function InputArea() {
  const [newTodoInputValue, setNewTodoInputValue] = useState("");
  console.log(newTodoInputValue);
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input onValueChange={setNewTodoInputValue} label="새로운 할 일" />
      <Button
        className="h-14"
        color={newTodoInputValue.length > 0 ? "warning" : "default"}
      >
        추가
      </Button>
    </div>
  );
}
