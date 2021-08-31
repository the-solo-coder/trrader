import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

import api from '../../config/web';

const UpdateAlert = props => {
    const [symbol, setSymbol] = useState();
    const [condition, setCondition] = useState();
    const [targetValue, setTargetValue] = useState();
    const [symbols, setSymbols] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const fetchSymbolsList = () => {
            axios.get('https://api.binance.com/api/v1/exchangeInfo')
                .then((res) => {
                    let symbolList = [];
                    res.data.symbols.forEach(function (item) { symbolList.push({ value: item.symbol, label: item.symbol }) }
                    );
                    setSymbols(symbolList);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchSymbolsList();
    }, [])

    const onChangeSymbol = (value, { action }) => {
        switch (action) {
            case "clear":
                if (value === null) {
                    setSymbol('');
                }
                break;
            case "select-option":
                setSymbol(value.value);
                break;
            default:
                break;
        }
    };

    const onChangeValue = (event) => {
        setTargetValue(event.target.value);
    }

    const onChangeCondition = (event) => {
        setCondition(parseInt(event.target.value));
    }

    const onUpdateAlert = (event) => {
        event.preventDefault();
        axios.patch(api.URI + '/updateAlert', {
            symbol,
            condition,
            value: targetValue
        })
            .then((response) => {
                console.log(response.data);
                history.push('/alerts');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <React.Fragment>
            <div className="content-wrapper">
                <form onSubmit={onUpdateAlert}>
                    <div className="card-Header">
                        <h4><i className="fa fa-bell"></i>Update Alert</h4>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={symbols}
                                onChange={onChangeSymbol}
                                placeholder={props.symbol}
                                isSearchable
                                noOptionsMessage={() => 'No symbol found.'}
                            />
                        </div>
                        <div className="form-group">
                            <label >Condition</label>
                            <select className="form-control"
                                value={condition}
                                onChange={onChangeCondition}>
                                <option>Select option</option>
                                <option value="1"> More than </option>
                                <option value="2"> Less than</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Target Value</label>
                            <input type="number" className="form-control" placeholder="Enter Value"
                                value={targetValue}
                                onChange={onChangeValue}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Save</button>&nbsp;
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default UpdateAlert;