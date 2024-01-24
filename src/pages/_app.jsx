import "@/styles/globals.css"

const App = ({ Component, pageProps }) => (
  <main className="flex flex-col">
    <header className="border-b-2 border-b-stone-200 bg-stone-100">
      <div className="mx-auto max-w-5xl p-4 flex justify-between items-center">
        <span>TODOS</span>
        <nav>
          <ul className="flex gap-4">
            <li>
              <a href="/todos/create">Create</a>
            </li>
            <li>
              <a href="/todos">List</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <section>
      <div className="mx-auto max-w-5xl p-4">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App
