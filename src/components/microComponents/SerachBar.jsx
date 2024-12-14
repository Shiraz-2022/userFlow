import React from "react";

// Images
import searchIcon from "../../assets/images/searchIcon.svg";

function SerachBar(props) {
  const { text, color, bgColor, onSearch } = props;

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="rounded-md p-3 flex gap-5 items-center"
    >
      <img src={searchIcon} alt="search-icon" className="w-5 h-5 text-sm" />
      <input
        style={{ color: color }}
        placeholder={text}
        className="focus:outline-none w-full"
        onChange={handleSearch}
      />
    </div>
  );
}

export default SerachBar;
