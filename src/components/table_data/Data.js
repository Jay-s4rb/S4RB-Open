/**
* Reusable table data component
* @Props.columns array of data values
**/
import { h }  from 'preact';

const TableData = ({columns}) => {
  const cols = columns.map(data => (<td> {data} </td>) );
  return (
    <tr>
      {cols}
    </tr>
  );
};

export default TableData;
