import { NextRequest, NextResponse } from "next/server";
import dummyTodos from "@/data/dummy.json";

// 모든 할 일 가져오기
export async function GET(request: NextRequest) {
  const response = {
    message: "할 일 목록 전부 가져오기",
    data: dummyTodos,
  };

  return NextResponse.json(response, { status: 200 });
}

// 할 일 추가
export async function POST(request: NextRequest) {
  const { title } = await request.json();

  const newTodo = {
    id: "10",
    title,
    id_done: false,
  };

  const response = {
    message: "할 일 추가 성공!",
    data: newTodo,
  };

  return Response.json(response, { status: 201 });
}
