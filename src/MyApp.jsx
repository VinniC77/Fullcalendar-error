import { useState } from "react";
import MyButton from "./components/MyButton";

export default function MyApp() {

  const [count, setCount] = useState(0);

  function handleClick() {
      setCount(count + 1)
  }

  return (
    <div>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  )
}