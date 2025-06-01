import { useEffect, useState } from "react";

export const ALERT_TIMEOUT = 5000;

export default function useTimedMessage(timeout = ALERT_TIMEOUT) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), timeout);
    return () => clearTimeout(timer);
  }, [message, timeout]);
  return [message, setMessage];
}
