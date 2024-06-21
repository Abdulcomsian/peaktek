import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = ({ className, size }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Search Term:", searchTerm);
    // Add your search logic here
  };

  return (
    <Input
      placeholder="Search..."
      prefix={
        <SearchOutlined
          style={{ color: "rgba(0,0,0,.45)" }}
          onClick={handleSearch}
        />
      }
      className={className}
      value={searchTerm}
      size={size}
      onChange={(e) => setSearchTerm(e.target.value)}
      onPressEnter={handleSearch}
    />
  );
};

export default SearchInput;
