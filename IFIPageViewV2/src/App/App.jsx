import React from 'react';
import { connect } from 'react-redux';
import styles from './css/style.css';
import InputComponent from '../_components/InputComponent';
import FontAwesome from 'react-fontawesome';



class App extends React.Component {
    constructor(props){
        super(props);
        this.changText = this.changText.bind(this);
    }

    changText(e){
        const value = e.target.value;
        this.setState({ value });
    
        console.log(value + ' hehe');
    }

    render() {
        return (
                <div className={styles.container_wrap}>
                    <div className="container">
                        Username
                        <InputComponent name="diep" type="text" value="diep" placeholder="Username" onChange={this.changText} icon="fa fa-user"/>
                        Password
                        <InputComponent name="nv" type="password" value="nv" placeholder="Password" onChange={this.changText} icon="fa fa-unlock"/>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
