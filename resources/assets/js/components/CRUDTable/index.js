import Table from "Components/Table";
import { IconButtonBarColumn } from "Components/Table/BuiltInColumns";

import React from "react";

const CRUDTable = ({
  columns,
  onAdd,
  onEdit,
  onBulkEdit,
  onBulkDelete,
  onAggregatedDelete,
  onDelete,
  displayRowButtons,
  displayAdvancedSelectorBtn,
  SelectorDropdownBody,
  ...restProps
}) => {
  return (
    <Table
      columns={[
        ...columns,
        IconButtonBarColumn({
          display: displayRowButtons,
          iconButtons: [
            {
              name: "ion-edit",
              onClick: onEdit
            },
            {
              name: "ion-android-delete",
              onClick: onDelete,
              onAggregatedClick: onAggregatedDelete
            }
          ]
        })
      ]}
      topButtons={[
        {
          bsStyle: "primary",
          iconName: "ion-android-add",
          onClick: onAdd
        },
        ...(displayAdvancedSelectorBtn
          ? [
              {
                noCaret: true,
                type: "dropdown",
                label: "Selektor",
                id:'table-selector-btn',
                DropdownBody:SelectorDropdownBody
              },
              {
    
                iconName: "ion-edit",
                onClick:onBulkEdit,

              },
              {
                iconName: "ion-android-delete",
                onClick:onBulkDelete,
              },
            ]
          : [])
      ]}
      {...restProps}
    />
  );
};

CRUDTable.defaultProps = {
  displayRowButtons: rowInfo => true,
  displayAdvancedSelectorBtn: false,
  SelectorDropdownBody: () => "",
  SelectAllInputComponent:()=>'',
  
};

export default CRUDTable;
