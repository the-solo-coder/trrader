import React, { Component } from 'react';
import { Row, Col, Box, } from 'adminlte-2-react';
import axios from 'axios';
//import toastr from 'toastr';
import queryString from 'query-string';
import webHost from '../../config/web';

export default class UpdateAlert extends Component {
    constructor() {
        super();
        this.state = {
            symbol: '',
            condition: '',
            value: '',
            message:''
        };
    }

    getId = () => {
        const getId = queryString.parse(window.location.search);
        return getId.id;
    }

    getMode = () => {
        const getMode = queryString.parse(window.location.search);
        return getMode.mode;
    }

    // ** Get lesson detail using lession id passed on query string
    componentDidMount() {
        axios.get(webHost.URI + '/api/binance/alertDetails' + this.getId())
            .then((response) => {
                this.setState({
                    symbol: response.data.symbol,
                    condition: response.data.condition,
                    value: response.data.value,
                    creator: response.data.creator,
                    mode: this.getMode()
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // ** On change events during editing of selected lesson
    onChangeSymbol(event) {
        this.setState({
            name: event.target.value
        });
    }
    onChangeCondition(event) {
        this.setState({
            description: event.target.value
        })
    }
    onChangeValue(event) {
        this.setState({
            video: event.target.value
        })
    }
    onFormClear(event) {
        this.clearFields();
    }

    // ** Update section upon user submission
    onSubmitUpdate(event) {
        event.preventDefault();

        axios.post(webHost.URI + '/api/lesson/updateAlert/' + this.getId(), {
            symbol: this.state.symbol,
            condition: this.state.condition,
            value: this.state.value,
            creator: this.state.creator
        })
           // .then((response) => {
               // toastr.success(response.data.msg);
              //  console.log(response.data.msg);

               // this.clearFields();
           // })
            .catch((error) => {
                console.log(error.data);
            });
    }

    // ** Clear fields after user submission
    clearFields() {
        this.setState({
            symbol: '',
            condition: '',
            value: '',
            creator: ''
        });
    }

    checkMode() {
        
        return <Row className="text-center">
            <Col md={12}>
                <button type="submit" className="btn btn-primary">
                    <i className="fa fa-check"></i>&nbsp;Update</button>&nbsp;
                            {/* {setButton} */}
            </Col>
        </Row>
    }

    render() {
        return (
            <>
                <div className="container">
                    <Row>
                        <Col md={2}>&nbsp;</Col>
                        <Col md={8}>
                            <form onSubmit={this.onSubmitUpdate.bind(this)}>
                                <h2><i className="fa fa-bell"></i>&nbsp;Update Alert</h2>
                                <Box type="primary" border="true"
                                    footer={
                                        this.checkMode()
                                    }>

                                    <div className="form-group">
                                        <label>Symbol:</label>
                                        <input type="text" className="form-control" placeholder="-----"
                                            value={this.state.symbol}
                                            onChange={(event) => this.onChangeSymbol(event)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Condition:</label>
                                        <textarea className="form-control" placeholder="-----" rows={10}
                                            value={this.state.condition}
                                            onChange={(event) => this.onChangeCondition(event)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Value</label>
                                        <input type="text" className="form-control" placeholder="-----"
                                            value={this.state.value}
                                            onChange={(event) => this.onChangeValue(event)} />
                                    </div>
                                </Box>
                            </form>
                        </Col>
                        <Col md={2}>&nbsp;</Col>
                    </Row>
                </div>
            </>
        );
    }
}