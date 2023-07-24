import React from "react";
export default class TaskAdding extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            items: [{
                text:"Learn task", key: Date.now() + 1
            }],
            input:'',
            placeholder:'Enter task'
        }
        // this.getFormValues()
    }

    

    handleChange = (e) => {
        this.setState({input: e.target.value})
    }

    getFormValues = () =>{
        const storedValues = localStorage.getItem('items');
        if(storedValues){
            return JSON.parse(storedValues)
        }
    } 

    add = () => {
        let text = !this.state.input.length ? "Attention input vide" : "Enter task"
        this.setState({placeholder:text})
        if(!this.state.input.length){
            return 
        }

        let newItem = {text: this.state.input, key: Date.now()}
        this.setState(state => ({
            items: [newItem].concat(state.items),
            input:''
        }))
        localStorage.setItem('items', JSON.stringify([newItem].concat(this.state.items)))
    }
    

    delete = (key) => {
        let filtered = this.state.items.filter(item => {
            if(key !== item.key){
                return item
            }
        })
        this.setState({
            items: filtered
        })
    }



    render(){
        return (<div className="container pt-3">
            <div className="row todoListMain border p-5 rounded d-flex justify-content-center bg-info">
                <div className="header col-md-11">
                    <form className="input-group pb-2" onSubmit={(e) => {e.preventDefault(); this.add()}}>
                        <input placeholder={this.state.placeholder} className="form-control" 
                        value={this.state.input} onChange={(e) => this.handleChange(e)}/>
                        <button className="btn btn-lg btn-primary">Add</button>
                    </form>

                    <ul className="list-unstyled text-start">
                        {this.state.items.map(item => {
                            return (<li key={item.key} onClick={() => this.delete(item.key)} className="p-3 bg-light border rounded mb-2">{item.text}</li>)
                        })}
                    </ul>
                </div>
            </div>
        </div>)
    }
}