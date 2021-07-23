import React, { Component } from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import api from '../../config/web';


export default class CreateAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            condition: '',
            value: ''
        };
    }

   /*  filterSymbols = (inputValue) => {
        let result = this.props.pairs.filter(i =>
            i.symbol.toLowerCase().includes(inputValue.toLowerCase())
          );
        return result; 
      }; */

  /*   fetchData = (inputValue, callback)=>{
        if(!inputValue){
            callback([]);
        }else{
            setTimeout(()=>{
                callback(this.filterSymbols(inputValue));
            },1000);
        }
    } */
    
  /*   onSearchChange = (symbol)=>{
        if(symbol){
            this.setState({
                symbol: symbol,
            });
        }
    }; */
    
    onChangeSymbol(event) {
        this.setState({
            symbol: event.target.value
        })
    }
    onChangeValue(event) {
        this.setState({
            value: event.target.value
        })
    }
    onChangeCondition(event) {
        this.setState({
            condition:parseInt(event.target.value)
        })
    }
    onFormClear(event) {
        this.clearFields();
    }
    //add new Alert upon submission
    onSubmitAlert(event) {
        event.preventDefault();
        axios.post(api.URI + '/addAlert', {
            symbol: this.state.symbol,
            condition: this.state.condition,
            value: this.state.value,
            creator: this.props.alert.creator
        })
        .then((response) => {
                console.log(response.data);
                this.clearFields();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //clear Fields after submission
    clearFields() {
        this.setState({
            symbol: '',
            condition: '',
            value: '',
            creator: ''
        });        
    }

    render() {
        return (
            <>
            <div className="container">   
                    <form  onSubmit={this.onSubmitAlert.bind(this)}>
                        <div className="card-Header">
                            <h4><i className="fa fa-bell"></i> New Alert</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputSymbol1">Symbol</label>
                                <select className="form-control"
                                        value={this.state.symbol} onChange={(e) => this.onChangeSymbol(e)}>
                                    {this.props.pairs.map((option)=>(
                                        <option value={option.symbol} key={option.symbol}>{option.symbol}</option>
                                    ))}
                                </select>
                            </div>
                           {/*  <div className="form-group">
                                <label htmlFor="exampleInputSymbol1">Symbol</label>
                                <AsyncSelect
                                className="form-control"
                                value={this.state.symbol}
                                onChange={(e)=> {this.onSearchChange(e);}}
                                loadOptions={this.fetchData}
                                defaultOptions={false}
                                
                                />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="exampleInputConditionl1">Condition</label>
                                <select className="form-control" id="exampleInputCondition1"
                                    value={this.state.condition}
                                    onChange={(event) => this.onChangeCondition(event)}
                                ><option>Select option</option>
                                    <option value= "1" > More than </option>
                                    <option value="2"> Less than</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputValue1">Value</label>
                                <input type="number" className="form-control" id="exampleInputValue1" placeholder="Enter Value"
                                    value={this.state.value}
                                    onChange={(event) => this.onChangeValue(event)}
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                            <button type="button" className="btn btn-default" onClick={(event) => this.onFormClear(event)}>&nbsp;Clear</button>

                        </div>
                    </form>
            </div>
            </>
        )
    }
}
