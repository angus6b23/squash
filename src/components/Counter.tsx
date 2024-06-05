import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, selectCounter } from "../store/counter";

const Counter = () => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex gap-2 text-xl items-center">
        <button className="btn" onClick={() => dispatch(decrement())}>
          -
        </button>
        <h5>{counter}</h5>
        <button className="btn" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
    </>
  );
};

export default Counter;
