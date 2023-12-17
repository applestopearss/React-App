import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";

import CustomTable from './components/Table';
  
class App extends Component {
    render() {
        return (
            <Container>
                <CustomTable />
            </Container>
        );
    }
}
  
export default App;