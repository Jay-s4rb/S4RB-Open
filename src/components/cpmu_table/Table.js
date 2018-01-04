import { h }  from 'preact';
import Data from '../table_data/Data';
import { cpmuCalc as calc, formatDate as fmt } from '../../utils';

const Table = ({period, toggle, data}) => {
	const dataRows = data.map((obj, i) => {
		let cpmuCol, periodCol;
		
		if(period === 'Month'){
			cpmuCol = calc(obj.Complaints, obj.UnitsSold);
			periodCol = fmt(obj.Month);
		}else{
			cpmuCol = obj.Cmpu;
			periodCol = obj.Quarter;
		}

		return <Data columns={[periodCol, cpmuCol ]}  key={i} />;
	});

	return (
		<table class="app__table">
			<tr>
				<th class="toggle" onClick={e => toggle()} >{(period === 'Quarter')? `${period} (over total of years)` : period }</th>
				<th>Cpmu</th>
			</tr>
			{dataRows}
		</table>
	);

};

export default Table;
