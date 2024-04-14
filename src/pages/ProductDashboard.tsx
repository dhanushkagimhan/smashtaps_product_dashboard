import { useEffect, useState } from "react";
import { SelectCategoryBox, SelectProductBox } from "./components";
import { Button } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ProductType } from "../types";
import {
  useDisableReportBtnStore,
  useReportGeneratedDataStore,
} from "../states";

export default function ProductDashboard() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [showColumnChart, setShowColumnChart] = useState<boolean>(false);

  const [columnChartXName, setColumnChartXName] = useState<string[]>([]);
  const [columnChartDate, setColumnChartDate] = useState<number[]>([]);

  const disableReportBtnState = useDisableReportBtnStore();
  const reportGeneratedDataState = useReportGeneratedDataStore();

  useEffect(() => {
    console.log(disableReportBtnState.btnState);
    disableReportBtnState.setBtnState(true);
  }, []);

  const setColumnChartData = () => {
    const tempData: number[] = [];
    const tempName: string[] = [];

    products.forEach((element: ProductType) => {
      tempData.push(element.price);
      tempName.push(element.title);
    });

    setColumnChartXName(tempName);
    setColumnChartDate(tempData);
  };

  const runReport = () => {
    console.log(selectedProducts);
    reportGeneratedDataState.setGeneratedCategory(selectedCategory);
    setColumnChartData();

    setShowColumnChart(true);
    disableReportBtnState.setBtnState(true);
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

  const pieChartOptions = {
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

  const columnChartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Product in selected category",
    },
    xAxis: {
      categories: columnChartXName,
    },
    series: [
      {
        data: columnChartDate,
      },
    ],
  };

  // Highcharts.chart('container', {
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'Corn vs wheat estimated production for 2020',
  //     align: 'left'
  //   },
  //   subtitle: {
  //     text:
  //       'Source: <a target="_blank" ' +
  //       'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
  //     align: 'left'
  //   },
  //   xAxis: {
  //     categories: ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia'],
  //     crosshair: true,
  //     accessibility: {
  //       description: 'Countries'
  //     }
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: '1000 metric tons (MT)'
  //     }
  //   },
  //   tooltip: {
  //     valueSuffix: ' (1000 MT)'
  //   },
  //   plotOptions: {
  //     column: {
  //       pointPadding: 0.2,
  //       borderWidth: 0
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'Corn',
  //       data: [406292, 260000, 107000, 68300, 27500, 14500]
  //     },
  //     {
  //       name: 'Wheat',
  //       data: [51086, 136000, 5500, 141000, 107180, 77000]
  //     }
  //   ]
  // });

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
              disabled={disableReportBtnState.btnState}
            >
              Run Report
            </Button>
          </div>
        </div>
        <div className="col-span-3">
          <div className="mt-[100px]">
            {showColumnChart ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={columnChartOptions}
              />
            ) : (
              <HighchartsReact
                highcharts={Highcharts}
                options={pieChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
