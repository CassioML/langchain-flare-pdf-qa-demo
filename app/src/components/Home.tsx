import './App.css';
import {UserDesc} from "../interfaces/interfaces";

const Home = (props: UserDesc) => {

  const {userId} = props;

  return (
    <div>
      <p>Welcome, <span className="userName">{userId}</span>.</p>
      <p>This demo is about:</p>
      <ul>
        <li>LangChain's FLARE question-answering</li>
        <li>Ingestion of PDF documents</li>
        <li>Astra as a vector store, <i>partitioned per-user</i></li>
        <li>API: Python (LangChain, CassIO, FastAPI)</li>
        <li>Client: React/Typescript</li>
      </ul>
      <p>Enjoy!</p>
    </div>
  );
}

export default Home
