import { useState } from "react";
import { SelectCategoryBox, SelectProductBox } from "./components";
import { Button } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ProductType } from "../types";

export default function ProductDashboard() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [showColumnChart, setShowColumnChart] = useState<boolean>(false);
  const [disableReportBtn, setDesableReportBtn] = useState<boolean>(true);

  const runReport = () => {
    console.log(selectedProducts);
  };

  const clearBtn = () => {
    setSelectedCategory("");
    setSelectedProducts([]);
  };

  const getPieChartData = () => {
    const tempData: { name: string; y: number }[] = [];

    const dataValue = 100 / categories.length;

    categories.forEach((element) => {
      tempData.push({ name: element, y: dataValue });
    });

    return tempData;
  };

  const pieChartoptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "All Categories",
    },
    series: [
      {
        data: getPieChartData(),
      },
    ],
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
              categories={categories}
              setCategories={setCategories}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="mt-10">
            <SelectProductBox
              selectedCategory={selectedCategory}
              selectedProducts={selectedProducts}
              products={products}
              setProducts={setProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </div>

          <div className="mt-[100px]">
            <Button
              variant="contained"
              onClick={() => runReport()}
              disabled={disableReportBtn}
            >
              Contained
            </Button>
          </div>
        </div>
        <div className="col-span-3">
          <div className="mt-[100px]">
            {showColumnChart ? (
              <></>
            ) : (
              <HighchartsReact
                highcharts={Highcharts}
                options={pieChartoptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
