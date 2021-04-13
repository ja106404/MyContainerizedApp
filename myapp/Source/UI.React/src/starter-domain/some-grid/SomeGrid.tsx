import React, { useState, useEffect } from "react";
import { Spinner } from "csg-react-magnetic/spinner";
import { DataGrid, IDataGridProps, IDataGridColumn } from "csg-react-magnetic/data-grid";
import { View, Cell } from "./SomeGrid.style";
import { SomeGridModel } from "./SomeGrid.model";
import http from "_services/http";

const dateOfLossTemplate = (col: IDataGridColumn, row: any[]) => {
  const colId: any = col.id;
  return <Cell>{new Date(row[colId]).toLocaleDateString()}</Cell>;
};

export const SomeGrid = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SomeGridModel[]>([]);

  useEffect(() => {
    setLoading(true);
    http.get(
      "/api/view/somegrid",
      (data: SomeGridModel[]) => {
        setData(Array.isArray(data) ? data : []);
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, []);

  const simpleDataGridProps: IDataGridProps = {
    columns: [
      { id: "claimNumber", name: "Claim Number" },
      { id: "claimantName", name: "Claimant Name" },
      { id: "dateOfLoss", name: "Date of Loss", template: dateOfLossTemplate }
    ],
    selectable: { trackByColumn: "claimantId" },
    data
  };

  return loading ? (
    <Spinner wholePage={true} />
  ) : (
    <View>
      <DataGrid {...simpleDataGridProps} />
    </View>
  );
};
