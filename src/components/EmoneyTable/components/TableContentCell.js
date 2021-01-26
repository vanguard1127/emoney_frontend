import {
  Table,
} from '@devexpress/dx-react-grid-material-ui';
import { get } from 'lodash';
const TableContentCell = ({ row, column, value }) => {
  const cellFn = get(column, 'cell');
  const content = cellFn
    ? cellFn(row, column, value)
    : value;
  return <Table.Cell>{content}</Table.Cell>;
}
export default TableContentCell;