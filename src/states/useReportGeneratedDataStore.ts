import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ReportGeneratedDataState = {
  generatedCategory: string;
  generatedProduct: string[];
  setGeneratedCategory: (values: string) => void;
  setGeneratedProduct: (values: string[]) => void;
};

const useReportGeneratedDataStore = create<ReportGeneratedDataState>()(
  devtools(
    persist(
      (set) => ({
        generatedCategory: "",
        generatedProduct: [],
        setGeneratedCategory: (values) =>
          set(() => ({ generatedCategory: values })),
        setGeneratedProduct: (values) =>
          set(() => ({ generatedProduct: values })),
      }),
      {
        name: "report-generated-data-storage",
      }
    )
  )
);

export default useReportGeneratedDataStore;
