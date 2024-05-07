import { title } from "@/components/primitives";
import TodosTable from "@/components/Todos/todos-table";
import { Todo } from "@/types";
import InputArea from "@/components/Todos/InputArea";

export default async function TodosPage() {
  const todos = await (
    await fetch(`${process.env.BASE_URL}/api/todos`, { cache: "no-store" })
  ).json();

  const todoList: Todo[] = todos.data;
  console.log("todoList = ", todoList);
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      <InputArea />
      <TodosTable todos={todoList ?? []} />
    </div>
  );
}
