"use client";
import { DataTableProductivity } from "./data-table-productivity";
import { Productivity } from "@/models/productivity/productivity";
import { columns } from "./columns";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

const ProductivityListTable = () => {
  const tableDataSelector = (state: RootState) =>
    state.productivityV2.productivityData;
  const tableData = useSelector(tableDataSelector);

  var data: Productivity[] = [];
  const [isChecked, setIsChecked] = useState(false);

  data = tableData;

  return (
    <div className='mb-2 p-4'>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(!isChecked)}
          />
        }
        label='All Data'
      />
      <DataTableProductivity columns={columns} data={data} manual={isChecked} />
      <br />
      <hr />
    </div>
  );
};

export default ProductivityListTable;
