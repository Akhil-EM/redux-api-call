import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { fetchTodo } from "./redux/slices/todo";
import { addMotor  } from "./redux/slices/motor";
import { useState,useEffect } from "react";
const variants = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  INFO: "INFO",
  WARNING: "WARNING",
};
function App() {
  const dispath = useDispatch();
  const state = useSelector((state) => state);
  const todoState = state.todo;
  const motorState = state.motor;
  const [name,setName] = useState("");

  const notify = (message, variant) => {
    switch (variant) {
      case variants.SUCCESS:
        toast.success(message);
        break;
      case variants.ERROR:
        toast.error(message);
        break;
      case variants.WARNING:
        toast.warning(message);
        break;
      default:
        toast.info(message);
    }
  };

  const addMotorSubmit = () => {
    if (!motorState.isLoading) {
      const dataSet = {
        name:name,
        remarks: "working motor",
        inputVoltage: 412,
        frequency: 300,
        ratedCurrent: 184,
        startingCurrent: 130,
        load: 32,
        rpm: 3200,
        bearingCondition: 364,
        temperature: 320,
        vibration: 120,
        inputVoltageTolerance: 63,
        frequencyTolerance: 66,
        ratedCurrentTolerance: 63,
        startingCurrentTolerance: 65,
        loadTolerance: 63,
        rpmTolerance: 69,
        bearingConditionTolerance: 98,
        temperatureTolerance: 63,
        vibrationTolerance: 62,
      };
      dispath(addMotor(dataSet));
      setName("")
    }
  };

  useEffect(() => {
    if (motorState.isError) {
      motorState.data &&
        motorState.data[0].forEach((error) => {
          notify(error, variants.ERROR);
        });
    }

    if (motorState.data && !motorState.isError && !motorState.isLoading) {
      notify(motorState.data.message, variants.SUCCESS);
    }
  }, [motorState]);
  // console.log(name);
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex" }}>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name}></input>
          <button
            onClick={() => addMotorSubmit()}
            style={{ marginBottom: "25px" }}
          >
            {motorState.isLoading ? "Loading" : "Add Motor"}
          </button>
        </div>

        <button onClick={() => dispath(fetchTodo())}>fetch todo</button>
        <p>todo list</p>
        <ol>
          {todoState.data &&
            todoState.data.map((todo) => <li key={todo.id}>{todo.title}</li>)}
        </ol>
        <ToastContainer />
      </header>
    </div>
  );
}

export default App;
