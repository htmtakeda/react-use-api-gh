import React from 'react';
import './App.css';


const App = () => {
	const [state, setState] = React.useState({
		zipcode:'',
		address:''
	});
	
	const handleChange =(e) => {
		setState({zipcode: e.target.value});
	}

	const handleSubmit = (e)=> {
		fetch(`https://api.zipaddress.net/?zipcode=${state.zipcode}`, {
			mode: 'cors'
		})
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				if (myJson.code === 200){
					setState({...state,address: myJson.data.fullAddress});
				}else{
					setState({...state,address: myJson.message});
				}
			});
		e.preventDefault();
	}
	
	return (
		<div>
			<p>Enter zip code</p>
			<form onSubmit={handleSubmit}>
				<p className="App-intro">
					<input type="text" value={state.zipcode} onChange={handleChange}/>
					<input type="submit" value="検索"/>
				</p>
			</form>
			<p>{state.address}</p>
		</div>
	);
}


export default App;
