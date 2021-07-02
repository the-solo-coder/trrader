import React, { Component } from 'react';
 import { Row, Col } from 'adminlte-2-react';

class Home extends Component {
    render() {
        return (
            <>
                <div className="container-fluid">
                    <Row>
                        <Col md={12}><h2><i className="fa fa-home"></i>&nbsp;Dashboard</h2></Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Home;
