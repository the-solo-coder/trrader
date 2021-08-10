import React, { useState, Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
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

    onChangeSymbol = (value, { action }) => {
        switch (action) {
            case "clear":
                if (value === null) {
                    this.setState({ symbol: '' })
                }
                break;
            case "select-option":
                this.setState({ symbol: value.value });
                break;
            default:
                break;
        }
    };

    onChangeValue(event) {
        this.setState({
            value: event.target.value
        })
    }
    onChangeCondition(event) {
        this.setState({
            condition: parseInt(event.target.value)
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
            condition: '',
            value: '',
            creator: ''
        });
    }

    render() {
        return (
            <>
                <div className="content-wrapper">
                    <form onSubmit={this.onSubmitAlert.bind(this)}>
                        <div className="card-Header">
                            <h4><i className="fa fa-bell"></i> New Alert</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <Select
                                    isClearable={true}
                                    options={this.props.symbols}
                                    onChange={this.onChangeSymbol}
                                    placeholder="Select Symbol"
                                    isSearchable
                                    noOptionsMessage={() => 'No symbol found.'}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputConditionl1">Condition</label>
                                <select className="form-control" id="exampleInputCondition1"
                                    value={this.state.condition}
                                    onChange={(event) => this.onChangeCondition(event)}>
                                    <option>Select option</option>
                                    <option value="1"> More than </option>
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


