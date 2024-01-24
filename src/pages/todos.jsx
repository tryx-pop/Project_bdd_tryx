import { readDatabase } from "@/db/readDatabase"

export const getServerSideProps = async () => {
  const { todos } = await readDatabase()

  return {
    props: { todos: Object.values(todos) },
  }
}
const TodosPage = ({ todos }) => (
  <ul className="flex flex-col gap-4">
    {todos.map(({ id, description, isDone }) => (
      <li key={id}>
        <input type="checkbox" checked={isDone} /> #{id} {description}
      </li>
    ))}
  </ul>
)

export default TodosPage
