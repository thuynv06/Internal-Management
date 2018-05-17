import React from 'react';
import { connect } from 'react-redux';
import styles from './css/style.css';
import InputComponent from '../_components/InputComponent';
import Button from '../_components/Button';



class App extends React.Component {
    

    render() {
        const styleButton = {
            height: "40px", color: "orange", width: "10%" ,fontsize: "20px" ,background:"green" ,borderRadius:"10px"
        };
        return (
                <div className={styles.container_wrap}>
                    <div className="container ">
                        Username
                        <InputComponent name="diep" type="text" value="root" placeholder="Username" icon="fa fa-user"/>
                        Password
                        <InputComponent name="diep" type="password" value="123564" placeholder="Password" icon="fa fa-unlock"/>
                    </div>
                    <Button type="submit" {...styleButton}>
                        Login
                    </Button>
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
