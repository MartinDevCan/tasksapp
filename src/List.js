import { Component } from 'react';
import bulletpoint from './bulletpoint.png'
import Swal from 'sweetalert2'

export class List extends Component {
    state = {
        userInput: '',
        myList: []
    }
    onChangeEvent(e) {
        this.setState({userInput: e})
        console.log(e)
    }

    addItem(input) {
        if(input === '') {
            Swal.fire({
                title: 'Oops!',
                text: 'You forgot to enter task',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        } 
        else {
        let listArray = this.state.myList;
        listArray.push(input);
        this.setState({myList: listArray, userInput: ''})
        }
    }

    removeItem() {
        let listArray = this.state.myList;
        listArray = [];
        this.setState({myList: listArray})
    }

    crossedWord(event) {
        const li = event.target;
        li.classList.toggle('crossed');
    }

    delOneItem(e) {
        let listArray = this.state.myList;
        listArray.splice(e.index, 1);
        this.setState({myList: listArray});
    }
    
    onFormSubmit(e) {
        e.preventDefault();
    }

    render() {
        return(
            <div>
                <form onSubmit={this.onFormSubmit}>
            <div className='container'>
                <input type="text"
                placeholder="Enter text..."
                onChange={(e) => {this.onChangeEvent(e.target.value)}}
                value={this.state.userInput}/>
            </div>

            <div className='container'>
                <button onClick={() => this.addItem(this.state.userInput)} className="btn add">Add</button>
            </div>

            <ul>
                {this.state.myList.map((item, index) => (
                    <li key={index} onDoubleClick={(e) => this.delOneItem({index})} onClick={this.crossedWord}>
                    <img src={bulletpoint} width="30px" alt="bulletpoint" />
                    {item}
                </li>
                ))}
            </ul>

            <div className='container'>
            <button onClick={() => this.removeItem()} className="btn clear">Clear all</button>
            </div>
            </form>

            </div>
        )
    }
}