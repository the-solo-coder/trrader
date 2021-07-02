import React, { Component } from 'react';
import axios from 'axios';
import webHost from '../../config/web';
export default class CreateAlert extends Component {
    constructor() {
        super();
        this.state = {
            symbol: '',
            condition: '',
            value: '',
            message:''
        }
    }
    
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
            condition: event.target.value
        })
    }
    onFormClear(event) {
        this.clearFields();
    }
    //add new Alert upon submission
    onSubmitAlert(event) {
        event.preventDefault();
        axios.post(webHost.URI + '/api/binance/addAlert', {
            symbol: this.state.symbol,
            condition: this.state.condition,
            value: this.state.value,
            creator: this.props.creator
        })
        .then((response) => {
                console.log(response.data);
              //  this.setState({
              //      message: response.data.msg
              //  })
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
                                <input type="text" className="form-control" id="exampleInputSymbol1" placeholder="Enter Symbol"
                                    value={this.state.symbol}
                                    onChange={(event) => this.onChangeSymbol(event)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputConditionl1">Condition</label>
                                <select className="form-control" id="exampleInputCondition1"
                                    value={this.state.condition}
                                    onChange={(event) => this.onChangeCondition(event)}>
                                        <option>Select option</option>
                                        <option> More than </option>
                                        <option> Less than</option>
                                </select>
                                
                            {/*     <input type="number" className="form-control" id="exampleInputCondition1" placeholder="Enter Condition"
                                    value={this.state.condition}
                                    onChange={(event) => this.onChangeCondition(event)}
                                /> */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputValue1">Value</label>
                                <input type="number" className="form-control" id="exampleInputValue1" placeholder="Enter Value"
                                    value={this.state.value}
                                    onChange={(event) => this.onChangeValue(event)}
                                />
                            </div>
                        </div>
                        <input type="hidden" value={this.props.creator} />
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
