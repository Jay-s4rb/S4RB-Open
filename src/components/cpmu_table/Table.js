import { h }  from 'preact';
import Data from '../table_data/Data';

const Table = ({period, toggle, data}) => {
	
	const dataRows = data.map((obj, i) => {
		let periodCol;

		if(period === 'Month'){
			periodCol = obj.Month;
		}else{
			periodCol = obj.Quarter;
		}

		return <Data columns={[periodCol, obj.Cmpu ]}  key={i} />;
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
