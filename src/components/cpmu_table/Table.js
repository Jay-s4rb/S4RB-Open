import { h }  from 'preact';
import Data from '../table_data/Data';
import { cpmuCalc as calc, formatDate as fmt } from '../../utils';

const Table = ({period, toggle, data}) => {

	const dataRows = data.map((obj, i) => {
		const cpmuCol = (obj.Complaints && obj.UnitsSold) ? calc(obj.Complaints, obj.UnitsSold) : 0.00000;
		const periodCol = (period === 'Month')? fmt(obj.Month) : obj.Quarter;
		return <Data columns={[periodCol, cpmuCol ]}  key={i} />;
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
