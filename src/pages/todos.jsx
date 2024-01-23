import { readDatabase } from "@/db/readDatabase"

export const getServerSideProps = async () => {
  const todos = await readDatabase()

  return {
    props: { todos },
  }
}
const TodosPage = ({ todos }) => (
  <ul className="flex flex-col gap-4">
    {todos.map((todo, index) => (
      <li key={index}>
        [{index}] {todo}
      </li>
    ))}
  </ul>
)

export default TodosPage
