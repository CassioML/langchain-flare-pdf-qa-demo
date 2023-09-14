import './App.css';
import {UserDesc} from "../interfaces/interfaces";

const Home = (props: UserDesc) => {

  const {userId} = props;

  return (
    <div>
      <p>Welcome, <span className="userName">{userId}</span>.</p>
      <p>This demo is about:</p>
      <ul>
        <li>LangChain's <a href="https://arxiv.org/abs/2305.06983" target="blank;" className="linkUrl">FLARE</a> question-answering</li>
        <li>Ingestion of PDF documents</li>
        <li>Astra as a vector store, <i>partitioned per-user</i></li>
        <li>API: Python (LangChain, <a href="https://cassio.org/frameworks/langchain/about/" target="blank;" className="linkUrl">CassIO</a>, FastAPI)</li>
        <li>Client: React/Typescript</li>
      </ul>
      <p>Enjoy!</p>
    </div>
  );
}

export default Home
