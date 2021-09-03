import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'

import api from '../../config/web'

const CreateAlert = () => {
  const [symbol, setSymbol] = useState()
  const [condition, setCondition] = useState()
  const [targetValue, setTargetValue] = useState()
  const [symbols, setSymbols] = useState([])

    const onChangeValue = (event) => {
        setTargetValue(event.target.value);
    }

    const onChangeCondition = (event) => {
        setCondition(parseInt(event.target.value));
    }

    //add new Alert upon submission
    const onSubmitAlert = (event) => {
        event.preventDefault();
        axios.post(api.URI + '/addAlert', {
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
                    <form onSubmit={onSubmitAlert}>
                        <div className="card-Header">
                            <h4><i className="fa fa-bell"></i> New Alert</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <Select
                                    isClearable={true}
                                    options={symbols}
                                    onChange={onChangeSymbol}
                                    placeholder="Select Symbol"
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
                                <input type="number" className="form-control"  placeholder="Enter Value"
                                    value={targetValue}
                                    onChange={onChangeValue}
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                        </div>
                    </form>
                </div>  
        </React.Fragment>
    );

  const history = useHistory()

  useEffect(() => {
    const fetchSymbolsList = () => {
      axios
        .get('https://api.binance.com/api/v1/exchangeInfo')
        .then(res => {
          let symbolList = []
          res.data.symbols.forEach(function (item) {
            symbolList.push({ value: item.symbol, label: item.symbol })
          })
          setSymbols(symbolList)
        })
        .catch(err => {
          console.log(err)
        })
    }
    fetchSymbolsList()
  }, [])

  const onChangeSymbol = (value, { action }) => {
    switch (action) {
      case 'clear':
        if (value === null) {
          setSymbol('')
        }
        break
      case 'select-option':
        setSymbol(value.value)
        break
      default:
        break
    }
  }

  const onChangeValue = event => {
    setTargetValue(event.target.value)
  }

  const onChangeCondition = event => {
    setCondition(parseInt(event.target.value))
  }

  //add new Alert upon submission
  const onSubmitAlert = event => {
    event.preventDefault()
    axios
      .post(api.URI + '/addAlert', {
        symbol,
        condition,
        value: targetValue
      })
      .then(response => {
        console.log(response.data)
        history.push('/alerts')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div className="container-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create Alert</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-primary card-outline" >
            <div className="card-body">
            <form onSubmit={onSubmitAlert}>
          <div className="card-body">
            <div className="form-group">
              <Select
                isClearable={true}
                options={symbols}
                onChange={onChangeSymbol}
                placeholder="Select Symbol"
                isSearchable
                noOptionsMessage={() => 'No symbol found.'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputConditionl1">Condition</label>
              <select
                className="form-control"
                value={condition}
                onChange={onChangeCondition}
              >
                <option>Select option</option>
                <option value="1"> More than </option>
                <option value="2"> Less than</option>
              </select>
            </div>
            <div className="form-group">
              <label>Target Value</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Value"
                value={targetValue}
                onChange={onChangeValue}
              />
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            &nbsp;
          </div>
        </form> 
            </div>
       
        </div>
        
      </div>
    </React.Fragment>
  )
}

export default CreateAlert

/* export default class CreateAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            condition: '',
            value: '',
            symbols: []
        };
    }

    componentDidMount() {
    
        axios.get('https://api.binance.com/api/v1/exchangeInfo')
            .then((res)=> {
                let symbolList= [];
                res.data.symbols.forEach(function(item)
                {symbolList.push({value: item.symbol, label: item.symbol})}
                );
                this.setState({symbols: symbolList})
            })
            .catch((err) => {
            console.log(err);
          });
      };

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
        console.log("sergio : ",this.symbols)
    }
    onChangeCondition(event) {
        this.setState({
            condition: parseInt(event.target.value)
        })
    }
    
    //add new Alert upon submission
    onSubmitAlert(event) {
        event.preventDefault();
        axios.post(api.URI + '/addAlert', {
            symbol: this.state.symbol,
            condition: this.state.condition,
            value: this.state.value,
            creator: "admin"
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
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
                                    options={this.symbols}
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
} */
