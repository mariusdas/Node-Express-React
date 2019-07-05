import React, { Component } from 'react';
import App from '.././App';

var GiftColumns = React.createClass(
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

var GiftRow = React.createClass(
{
		addFavourite(event)
		{
			event.preventDefault();
			var data = {
				gift_Id:this.refs.gift_Id.value,
				gift_Url:this.refs.gift_Url.value,
				gift_Preview_Url:this.refs.gift_Preview_Url.value,
				gift_Preview_Width:this.refs.gift_Preview_Width.value,
				gift_Preview_Height:this.refs.gift_Preview_Height.value,
				gift_Preview_Size:this.refs.gift_Preview_Size.value
			}
			var request = new Request('http://localhost:3001/api/addFavourite',{
				method:'POST',
				headers: new Headers({'Content-Type':'application/json'}),
				body: JSON.stringify(data)
			});
			fetch(request)
			.then(function (response)
				{
					console.log(response);	
				}
			);
		
		},
		render() {
			return (
			<tr>
				<td>{this.props.item.id}</td>
				<td>
					<a href={this.props.item.images.downsized.url}>
						<img src={this.props.item.images.downsized.url} width='100' height='100'/>
					</a>
				</td>
				<td>
					<form ref="addFavoriteForm">
						<input type="hidden" ref="gift_Id" value={this.props.item.id}  />
						<input type="hidden" ref="gift_Url" value={this.props.item.url}  />
						<input type="hidden" ref="gift_Preview_Url" value={this.props.item.images.downsized.url}  />
						<input type="hidden" ref="gift_Preview_Width" value={this.props.item.images.downsized.width}  />
						<input type="hidden" ref="gift_Preview_Height" value={this.props.item.images.downsized.height}  />
						<input type="hidden" ref="gift_Preview_Size" value={this.props.item.images.downsized.size}  />
						<button className="btn btn-info" onClick={this.addFavourite}>Pridėti į favourit'us</button>
					</form>
				</td>
			</tr>
			  
			);
	  }
});
	
class GiftsPage extends Component {
	constructor(){
		super();
		this.state = {
			title: 'Aplikacija',
			gifts: {
				data:[]
			}
		};
	}

	
	componentDidMount(){
		var that = this;
		fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
			.then(function (response)
			{
				response.json().then(function(dataAnwser){
					that.setState({
						gifts:{ data: dataAnwser.data }
					})
				});
			});
	}
	
  render() {
	var giftsData = this.state.gifts.data;
	var rows = [];
	giftsData.forEach(function(item){
		rows.push(<GiftRow key={item.id} item={item} />);
	})
    return (
		
		<div>
		<App />
			<table className="table table-striped">
				<thead>
					<GiftColumns />
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>	
     
	  
    );
  }
}

export default GiftsPage;
