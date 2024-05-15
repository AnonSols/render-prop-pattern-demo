import { createContext, ReactNode, useContext, useState } from "react";

type counterPropsType = {
  count: number;
  increase: () => void;
  decrease: () => void;
};
interface parentChildren {
  children: ReactNode;
}
const CounterContext = createContext<counterPropsType | undefined>(undefined);
const Counter = ({ children }: parentChildren) => {
  const [count, setCount] = useState(0);

  const increase = () => setCount((count) => count + 1);
  const decrease = () => setCount((count) => count - 1);
  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
};

function useCounter() {
  const counter = useContext(CounterContext);

  if (counter === undefined)
    throw Error("Context cannot be used outside of it's provider");

  return counter;
}

function Count() {
  const { count } = useCounter();

  return <span>{count}</span>;
}

function Label({ children }: parentChildren) {
  return <span>{children}</span>;
}

function Increment({ icon }: { icon: string }) {
  const { increase } = useCounter();
  return <button onClick={increase}>{icon}</button>;
}

function Decrement({ icon }: { icon: string }) {
  const { decrease } = useCounter();
  return <button onClick={decrease}>{icon}</button>;
}

Counter.Count = Count;
Counter.Label = Label;
Counter.Increment = Increment;
Counter.Decrement = Decrement;
export default Counter;
