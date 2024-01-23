export const getServerSideProps = ({ query }) => ({
  props: {
    todoId: query.todoId,
  },
})
const TodoPage = ({ todoId }) => `Todo #${todoId}`

export default TodoPage
