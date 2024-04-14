import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type DisableReportBtnState = {
  btnState: boolean;
  setBtnState: (values: boolean) => void;
};

const useDisableReportBtnStore = create<DisableReportBtnState>()(
  devtools(
    persist(
      (set) => ({
        btnState: true,
        setBtnState: (values) => set(() => ({ btnState: values })),
      }),
      {
        name: "disable-report-Btn-storage",
      }
    )
  )
);

export default useDisableReportBtnStore;
