import Table from 'Components/Table';
import { IconButtonBarColumn } from "Components/Table/BuiltInColumns";

import React from 'react';

const CRUDTable = ({columns, onAdd, onEdit,onAggregatedDelete, onDelete, displayRowButtons, ...restProps}) => {
    return (
        <Table
          columns={[
              ...columns,
              IconButtonBarColumn({
                display:displayRowButtons,
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
            }
          ]}
          {...restProps}
        />
    );
};

CRUDTable.defaultProps = {
    displayRowButtons: rowInfo => true,
}

export default CRUDTable;