import './App.css'
import UserRegistrationForm from './features/users/UserRegistrationForm';
import UserList from './features/users/UserList';

function App() {
  return (
    <div className="App">
      <p>TODO: IndexedDB stuff with <a target="_blank" href="https://github.com/dexie/Dexie.js">Dexie</a></p>
      <p>Pretty good example with typescript: <a target="_blank" href="https://github.com/dexie/Dexie.js/tree/master/samples/dexie-cloud-todo-app/src">Example</a></p>

      <UserRegistrationForm />

      <UserList />
    </div>
  )
}

export default App
