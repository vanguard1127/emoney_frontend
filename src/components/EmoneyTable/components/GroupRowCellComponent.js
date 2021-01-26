import {
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';
const GroupRowCellComponent = (props) => {
  return (
    <TableGroupRow.Cell {...props} className="emoney-group-row-cell" />
  );
};
export default GroupRowCellComponent;