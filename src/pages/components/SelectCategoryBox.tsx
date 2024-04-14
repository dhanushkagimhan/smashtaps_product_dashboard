import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import {
  useDisableReportBtnStore,
  useReportGeneratedDataStore,
} from "../../states";

type SelectCategoryBoxProps = {
  selectedCategory: string;
  categories: string[];
  setCategories: (category: string[]) => void;
  setSelectedCategory: (category: string) => void;
};

export default function SelectCategoryBox(props: SelectCategoryBoxProps) {
  const disableReportBtnState = useDisableReportBtnStore();
  const reportGeneratedDataState = useReportGeneratedDataStore();

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

  const handleChange = (e: SelectChangeEvent) => {
    const selectedValue: string = e.target.value;

    props.setSelectedCategory(selectedValue);

    if (reportGeneratedDataState.generatedCategory !== selectedValue) {
      disableReportBtnState.setBtnState(false);
    } else {
      disableReportBtnState.setBtnState(true);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="category-selection">Select Category</InputLabel>
      <Select
        labelId="category-selection"
        id="category-selection-box"
        value={props.selectedCategory}
        label="Category"
        onChange={handleChange}
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
