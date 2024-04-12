import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type SelectProductBoxProps = {
  selectedCategory: string;
  selectedProducts: string[];
  setSelectedProducts: (products: string[]) => void;
};

export default function SelectProductBox(props: SelectProductBoxProps) {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    if (props.selectedCategory !== "") {
      axios
        .get(
          "https://dummyjson.com/products/category/" + props.selectedCategory
        )
        .then((data) => {
          console.log(data.data.products);
          const tempProducts: string[] = [];

          data.data.products.forEach((element) => {
            tempProducts.push(element.title);
          });

          setProducts(tempProducts);
        })
        .catch((error) => {
          console.log("Error in Product load : " + error);
        });
    }
  }, [props.selectedCategory]);

  const handleChange = (event: SelectChangeEvent<typeof products>) => {
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
        {products.map((data, index) => {
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
