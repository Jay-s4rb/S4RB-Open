import { h }  from 'preact';
import Data from '../table_data/Data';
import { cpmuCalc as calc, formatDate as fmt } from '../../utils';

const Table = ({period, toggle, data}) => {

	const dataRows = data.map((obj, i) => {
		const cpmu = (obj.Complaints && obj.UnitsSold) ? calc(obj.Complaints, obj.UnitsSold) : 0.00000;
		return <Data columns={[fmt(obj.Month), cpmu ]}  key={i} />;
	});

	return (
		<table>
			<tr>
				<th onClick={e => toggle()} >{period}</th>
				<th>Cpmu</th>
			</tr>
			{dataRows}
		</table>
	);

};

export default Table;
