import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { SearchOutlined } from "@mui/icons-material";

import "./style.css"

interface Props {
    searchUpdate: Function;
  }
  
  const SearchBar = ({ searchUpdate }: Props) => {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      searchUpdate(event.target.value);
    }
  
    return (
      <div className="search">
        <TextField
          placeholder="Search"
          type="search"
          fullWidth
          className="search" 
          variant="outlined"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  };
  
  export default SearchBar;