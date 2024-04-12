import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { ProductType } from "../../types";

type SelectProductBoxProps = {
  selectedCategory: string;
  selectedProducts: string[];
  products: ProductType[];
  setSelectedProducts: (products: string[]) => void;
  setProducts: (products: ProductType[]) => void;
};

export default function SelectProductBox(props: SelectProductBoxProps) {
  useEffect(() => {
    if (props.selectedCategory !== "") {
      axios
        .get(
          "https://dummyjson.com/products/category/" + props.selectedCategory
        )
        .then((data) => {
          console.log(data.data.products);
          const tempProducts: ProductType[] = [];

          data.data.products.forEach((element) => {
            tempProducts.push({ title: element.title, price: element.price });
          });

          props.setProducts(tempProducts);
        })
        .catch((error) => {
          console.log("Error in Product load : " + error);
        });
    }
  }, [props.selectedCategory]);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    props.setSelectedProducts(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl disabled={props.selectedCategory === ""} fullWidth>
      <InputLabel id="category-selection">Select Category</InputLabel>
      <Select
        labelId="category-selection"
        id="category-selection-box"
        value={props.selectedProducts}
        multiple
        label="Category"
        onChange={handleChange}
      >
        {props.products.map((data, index) => {
          return (
            <MenuItem value={data.title} key={index}>
              {data.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
