import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type SelectCategoryBoxProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export default function SelectCategoryBox(props: SelectCategoryBoxProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((data) => {
        console.log(data.data);
        setCategories(data.data);
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
        {categories.map((data, index) => {
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
