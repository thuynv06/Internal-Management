import React from 'react';
import { connect } from 'react-redux';
import styles from './css/style.css';



class App extends React.Component {

    render() {
        return (
                <div className={styles.container_wrap}>
                <div className="container ">
                        Hello World
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
