import React, { Component } from 'react';

class Test extends Component{

    state= {
        title: '',
        userID: ''
    };

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(data => this.setState({
                title: data.title,
                userID: data.userId
            })
        );
    }

    // componentWillMount(){
    //     console.log("ComponentWillMount..");
    // }

    // componentDidUpdate(){
    //     console.log("ComponentDidUpdate..");
    // }

    // componentWillUpdate(){
    //     console.log("ComponentWillUpdate..");
    // }

    // componentWillReceiveProps(nextProps, nextState){
    //     console.log("won't run anyways. can useful with redux");
    // }

    // static getDerivedStateFromProps(nextProps, nextState){
    //     return null;
    // }

    // getSnapshotBeforeUpdate(prevProps, pervState){
    //     console.log("getSnapshotBeforeUpdate..");
    // }

    render() {
        const { title, userID} = this.state;
        return(
            <div>
                <h1>{title}</h1>
                <p>{userID}</p>
            </div>
        )
    }
}

export default Test;