import {
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';
const GroupRowComponent = (props) => {  
  return (
    <TableGroupRow.Row {...props} className="emoney-group-row" />
  );
};
export default GroupRowComponent;