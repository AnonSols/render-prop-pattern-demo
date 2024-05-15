import Counter from "./Counter";
import "./index.css";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      {/* <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      /> */}
      <Counter>
        <div>
          <Counter.Label>This is the app label</Counter.Label>
        </div>
        <Counter.Increment icon="➕" />
        <Counter.Count />
        <Counter.Decrement icon="➖" />
      </Counter>
    </div>
  );
}
