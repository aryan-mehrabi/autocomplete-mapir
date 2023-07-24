import { useState, useEffect } from "react";
import Autocomplete from "./Autocomplete";

export default function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(res => setItems(res.products))
      .catch(() => alert("something went wrong!!"));
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <div className="h-1/2 grid justify-center items-center">
        <div className="w-[300px] m-2">
          <div>
            <h1 className="text-2xl font-bold">Auto Complete</h1>
          </div>
          <div className="my-3">
            <p>
              <span className="font-semibold">Selected: </span>
              {selected?.title}
            </p>
          </div>
          <Autocomplete
            inputValue={selected}
            onInputChange={selected => setSelected(selected)}
            options={items}
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}
