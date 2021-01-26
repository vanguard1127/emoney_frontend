import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  GroupingState,
  IntegratedGrouping,
  IntegratedSelection,
  SelectionState,
  PagingState,
  CustomPaging
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  TableSelection,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { withMemo } from 'components/HOC';
import { groupBy, last } from 'lodash';
import { TableStubCell, GroupRowComponent, GroupRowCellComponent, GroupRowCellContentComponent, GroupRowCellIconComponent, TableContentCell } from './components'

const TableHeaderRowComponent = ({issubheader, subheader, columncount, ...props}) => {  
  
  return (
    <>
      <TableHeaderRow.Row {...props} className="emoney-group-row" />
      {
        issubheader && (
          <tr>
            <td colSpan={columncount.toString()} className="emoney-subheader-row">
              {subheader}
            </td>
          </tr>
        )
      }


    </>
  );
};

const EmoneyTable = ({
  data,
  columns,
  isGrouping,
  grouping,
  isSubHeader,
  subHeader,
  onSelected,
  isPagination,
  onRefreshPage,
  totalCount
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sizePerPage, setSizePerPage] = useState(10);

  const [expandedGroups, setExpandedGroups] = useState([]);
  const groupingValues = [{
    columnName: grouping.field
  }];
  useEffect(() => {
    const groups = groupBy(data, function (item) {
      return item[grouping.field].toString()
    });
    setExpandedGroups(Object.keys(groups));
  }, [data, grouping])
  const [selection, setSelection] = useState([0]);

  const onSelectionChange = (selectedIds) => {
    if (selectedIds?.length > 1) {
      selectedIds = [last(selectedIds)];
      setSelection(selectedIds)
    }
    if (onSelected && selectedIds?.length) {
      onSelected(data[selectedIds[0]])

    }

  }
  const [pageSizes] = React.useState([10, 50, 100, 500, 0]);
  return (
    <Paper className="emoney-grid-container">
      <Grid
        rows={data}
        columns={columns}
      >
        {
          isGrouping && (
            <GroupingState
              grouping={groupingValues}
              expandedGroups={expandedGroups}
              onExpandedGroupsChange={setExpandedGroups}
            />

          )
        }
        {isGrouping && (<IntegratedGrouping />)}
        <SelectionState
          selection={selection}
          onSelectionChange={onSelectionChange} 
        />
        <IntegratedSelection selection={selection} />
        <Table cellComponent={TableContentCell} stubCellComponent={TableStubCell} />
        <TableHeaderRow
          rowComponent={(props) => {
            return (<TableHeaderRowComponent
              {...props}
              columncount={ isGrouping ? columns.length : columns.length - 1}              
              issubheader={isSubHeader}
              subheader={subHeader} />);
          }
          } />
        <TableSelection
          selectByRowClick
          highlightRow
          showSelectionColumn={false}
        />
        {
          isGrouping && (
            <TableGroupRow
              rowComponent={GroupRowComponent}
              cellComponent={GroupRowCellComponent}
              contentComponent={GroupRowCellContentComponent}
              iconComponent={GroupRowCellIconComponent}
            />
          )
        }

        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={(page) => {
            console.log('page ', page);
            setCurrentPage(page);
            if (onRefreshPage) {
              onRefreshPage(page, sizePerPage);

            }
          }
          }
          defaultPageSize={sizePerPage}
          onPageSizeChange={(size) => {
            setSizePerPage(size);
            if (onRefreshPage) {
              onRefreshPage(currentPage, size)
            }
          }}
        />
        <CustomPaging totalCount={totalCount} />
        {
          isPagination && (<PagingPanel pageSizes={pageSizes} />)
        }
      </Grid>
    </Paper >
  );
};

const state = createStructuredSelector({});
export default connect(state)(withMemo(EmoneyTable));