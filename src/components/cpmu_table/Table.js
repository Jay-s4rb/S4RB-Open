import { h }  from 'preact';
import Data from '../table_data/Data';
import { cpmuCalc as calc, formatDate as fmt } from '../../utils';

const Table = ({period, toggle, data}) => {
	const dataRows = data.map((obj, i) => {
		let cpmuCol, periodCol;
		
		if(period === 'Month'){
			 cpmuCol = (obj.Complaints && obj.UnitsSold) ? calc(obj.Complaints, obj.UnitsSold) : 0.00000;
			 periodCol = fmt(obj.Month);
		}else{
			cpmuCol = obj.Cmpu || 0.00000;
			periodCol = obj.Quarter;
		}

		return <Data columns={[periodCol, cpmuCol ]}  key={i} />;
	});

	return (
		<table>
			<tr>
				<th onClick={e => toggle()} >{(period === 'Quarter')? `${period} (over total of years)` : period }</th>
				<th>Cpmu</th>
			</tr>
			{dataRows}
		</table>
	);

};

export default Table;
