// styles imports
import classes from "./App.module.css";

// local imports
import Header from "./Layout/Header";
import Landing from "./Pages/Landing";

function App() {
  return (
    <div className={classes.app}>
      <Header />
      <Landing />
    </div>
  );
}

export default App;
