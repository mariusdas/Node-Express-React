import React, { Component } from 'react';
import App from '.././App';

var GiftColumnsFavourite = React.createClass(
{
		render() {
		return (
		<tr>
			<td><h2>Id</h2></td>
			<td><h2>Nuotrauka</h2></td>
			<td><h2>Veiksmai</h2></td>
		</tr>
		  
		);
	  }
});

var GiftRowFavourite = React.createClass(
{
		removeFavourite(event)
		{
			event.preventDefault();
			
			var request = new Request('http://localhost:3001/api/removeFavouriteGift/'+this.refs.gift_Id.value,{
				method:'DELETE',
				headers: new Headers({'Content-Type':'application/json'})
			});
			fetch(request)
			.then(function (response)
				{
					console.log(response);	
					window.location.reload();
				}
			);
		
		},
		render() {
			return (
			<tr>
				<td>{this.props.item.Id}</td>
				<td>
					<a href={this.props.item.PreviewUrl}>
						<img src={this.props.item.PreviewUrl} width='100' height='100'/>
					</a>
				</td>
				<td>
					<form ref="removeFavoriteForm">
						<input type="hidden" ref="gift_Id" value={this.props.item.Id}  />
						<button className="btn btn-danger" onClick={this.removeFavourite}>Ištrinti favourit'ą</button>
					</form>
				</td>
			</tr>
			  
			);
	  }
});
class GiftsFavouritePage extends Component {
	constructor(){
		super();
		this.state = {
			changed: 'true',
			giftsFavourite: {
				data:[]
			}
		};
	}
	
	componentDidMount(){
		var that = this;
		fetch('http://localhost:3001/api/favouritesGifts')
			.then(function (response)
			{
				response.json().then(function(dataAnwser){
					that.setState({
						giftsFavourite:{ data: dataAnwser }
					})
				});
			});
	}
  render() {
	var giftsData = this.state.giftsFavourite.data;
	var rows = [];
	giftsData.forEach(function(item){
		rows.push(<GiftRowFavourite key={item.Id} item={item} />);
	})
    return (
		<div>
		<App />
			<div >
				<table className="table table-striped">
					<thead>
						<GiftColumnsFavourite />
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>	
		</div>	
	  
    );
  }
}


export default GiftsFavouritePage;
