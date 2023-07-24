import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClickEvent = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClickEvent);
    return () => document.removeEventListener("click", handleClickEvent);
  }, [ref, callback]);
}
