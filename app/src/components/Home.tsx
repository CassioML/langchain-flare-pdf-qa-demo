import './App.css';
import {UserDesc} from "../interfaces/interfaces";

const Home = (props: UserDesc) => {

  const {userId} = props;

  return (
    <div>
      HOME FOR {userId}
    </div>
  );
}

export default Home
