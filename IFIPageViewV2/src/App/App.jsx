import React from 'react';
import { connect } from 'react-redux';
import styles from './css/style.css';
import InputComponent from '../_components/InputComponent';



class App extends React.Component {

    render() {
        return (
                <div className={styles.container_wrap}>
                    <div className="container ">
                        <InputComponent name="diep" type="password" value="diep@gmail.com" placeholder="Input"/>
                    </div>

                </div>
                <Button type="submit" height="100px" color="orange" width="100%" fontsize="20px" background="green" borderRadius="10px">
                  Login
                </Button>
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
