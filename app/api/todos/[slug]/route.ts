import { NextRequest, NextResponse } from "next/server";
import { fetchATodo } from "@/data/firestore";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  // const searchParams = useSearchParams()
  const query = searchParams.get("query");
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  console.log(params.slug);
  const fetchedTodo = await fetchATodo(params.slug);

  if (!fetchedTodo) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "특정 할 일 가져오기",
    data: fetchedTodo,
  };

  return NextResponse.json(response, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const response = {
    message: "특정 할 일 삭제하기",
    data: {
      id: params.slug,
      title: "오늘도 빡코딩!",
      isDone: false,
    },
  };

  return NextResponse.json(response, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title, is_done } = await request.json();

  const editedTodo = {
    id: params.slug,
    title,
    is_done,
  };

  const response = {
    message: "특정 할 일 수정 성공",
    data: editedTodo,
  };

  return NextResponse.json(response, { status: 200 });
}
