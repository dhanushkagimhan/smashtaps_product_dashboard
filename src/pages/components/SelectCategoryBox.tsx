import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

type SelectCategoryBoxProps = {
  selectedCategory: string;
  categories: string[];
  setCategories: (category: string[]) => void;
  setSelectedCategory: (category: string) => void;
};

export default function SelectCategoryBox(props: SelectCategoryBoxProps) {
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((data) => {
        console.log(data.data);
        props.setCategories(data.data);
      })
      .catch((error) => {
        console.log("Error in categories load : " + error);
      });
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="category-selection">Select Category</InputLabel>
      <Select
        labelId="category-selection"
        id="category-selection-box"
        value={props.selectedCategory}
        label="Category"
        onChange={(e) => props.setSelectedCategory(e.target.value)}
      >
        {props.categories.map((data, index) => {
          return (
            <MenuItem value={data} key={index}>
              {data}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
