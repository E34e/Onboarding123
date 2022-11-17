import { useState } from "react";

export default function useCounter() {
  const [show, setShow] = useState(false);

  return {
    show,
    setShow,
  };
}
