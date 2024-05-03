import { NextRequest, NextResponse } from "next/server";
import dummyTodos from "@/data/dummy.json";
import { fetchTodos, addTodos } from "@/data/firestore";

// 모든 할 일 가져오기
export async function GET(request: NextRequest) {
  const fetchedTodos = await fetchTodos();

  const response = {
    message: "할 일 목록 전부 가져오기",
    data: fetchedTodos,
  };

  return NextResponse.json(response, { status: 200 });
}

// 할 일 추가
export async function POST(request: NextRequest) {
  const { title } = await request.json();

  const addTodo = addTodos({ title });

  const response = {
    message: "할 일 추가 성공!",
    data: addTodo,
  };

  return Response.json(response, { status: 201 });
}
