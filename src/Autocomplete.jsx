import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import useClickOutside from "./useClickOutside";

export default function Autocomplete({
  options,
  onInputChange,
  inputValue,
  placeholder,
}) {
  const ref = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(inputValue?.title || "");
  const [selected, setSelected] = useState(inputValue);

  useClickOutside(ref, () => isDropdownOpen && setIsDropdownOpen(false));

  useEffect(() => {
    setSelected(inputValue);
  }, [inputValue]);

  useEffect(() => {
    onInputChange(selected);
  }, [selected, onInputChange]);

  // keeps the search term sync with selected option when input is not focused.
  useEffect(() => {
    if (!isDropdownOpen) {
      setSearchTerm(selected?.title || "");
    }
  }, [selected, isDropdownOpen]);

  const onChangeSearchTerm = e => {
    setSearchTerm(e.target.value);
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };

  const onClickItem = item => {
    setSelected(item);
    setIsDropdownOpen(false);
  };

  const renderItems = () => {
    const items = options
      .filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(item => (
        <li
          onClick={() => onClickItem(item)}
          className={`hover:bg-slate-200 p-2 cursor-pointer ${
            item.id === selected?.id && "bg-slate-200"
          }`}
          key={item.id}
        >
          {item.title}
        </li>
      ));
    if (items.length) return <ul>{items}</ul>;
    else return <p className="p-2">Nothin found</p>;
  };

  return (
    <div ref={ref} className="relative">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={onChangeSearchTerm}
          className="border-2 focus:border-blue-200 rounded-md w-full p-2 outline-none shadow-sm"
          placeholder={placeholder}
        />
        <div className="absolute top-0 right-0 select-none h-full flex items-center">
          {selected && (
            <div
              onClick={() => setSelected(null)}
              className="cursor-pointer px-1 grid content-center mr-1"
            >
              <span className="text-lg font-bold text-slate-400">&times;</span>
            </div>
          )}
          <div
            className={`mr-2 cursor-pointer ${
              isDropdownOpen && "rotate-180"
            }  transition-all px-1 grid content-center`}
            onClick={() => setIsDropdownOpen(val => !val)}
          >
            <span className="text-xs text-slate-400">&#9660;</span>
          </div>
        </div>
      </div>
      <div className="absolute bg-white rounded-md overflow-auto max-h-[200px] w-full shadow">
        {isDropdownOpen && renderItems()}
      </div>
    </div>
  );
}

Autocomplete.propTypes = {
  options: PropTypes.array,
  onInputChange: PropTypes.func,
  inputValue: PropTypes.object,
  placeholder: PropTypes.string,
};
