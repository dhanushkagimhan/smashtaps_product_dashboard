import { useState } from "react";
import { SelectCategoryBox, SelectProductBox } from "./components";
import { Button } from "@mui/material";

export default function ProductDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const runReport = () => {
    console.log(selectedProducts);
  };

  const clearBtn = () => {
    setSelectedCategory("");
    setSelectedProducts([]);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="border-2 border-black px-5 py-8">
          <div className="flex flex-row justify-between">
            <div>Filter</div>
            <div className="cursor-pointer" onClick={() => clearBtn()}>
              Clear
            </div>
          </div>
          <div className="mt-10">
            <SelectCategoryBox
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="mt-10">
            <SelectProductBox
              selectedCategory={selectedCategory}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </div>

          <div className="mt-[100px]">
            <Button
              variant="contained"
              onClick={() => runReport()}
              disabled={selectedCategory === ""}
            >
              Contained
            </Button>
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
