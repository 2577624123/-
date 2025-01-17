import React, { Component } from 'react'
import store from '../../redux/store'

export default class Count extends Component {
    state = { }

    increment = () => {
        const {value} = this.selectNumber
        store.dispatch({type:'increment',data:value})

    }
    decrement = () => {
        const {value} = this.selectNumber
        store.dispatch({type:'decrement',data:value})
    }
    incrementIFOdd = () => {
        const {value} = this.selectNumber
        const count = store.getState()
        if (count % 2 !== 0) {
            store.dispatch({type:'increment',data:value})
        }

    }
    incrementAsync = () => {
        const {value} = this.selectNumber
        console.log('开始前')
        setTimeout = (() => {
            store.dispatch({type:'increment',data:value})
            console.log('开始后')
        }, 500)

    }
    render() {
        return (
            <div>
                <h1>当前求和为：{store.getState()}</h1>
                <select ref={c => { this.selectNumber = c }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementIFOdd}>奇数加</button>
                <button onClick={this.incrementAsync}>异步加</button>

            </div>
        )
    }
}
