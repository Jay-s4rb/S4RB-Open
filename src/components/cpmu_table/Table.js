import { h }  from 'preact';
import Data from '../table_data/Data';
import { cpmuCalc as calc, formatDate as fmt } from '../../utils';

const Table = ({data}) => {

	const dataRows = data.map((obj, i) => <Data columns={[fmt(obj.Month), calc(obj.Complaints, obj.UnitsSold)]}  key={i} /> );

	return (
		<table>
			<tr>
				<th>Month</th>
				<th>Cpmu</th>
			</tr>
			{dataRows}
		</table>
	);

};

export default Table;
