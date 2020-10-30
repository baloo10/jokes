import React, { Component } from 'react'
import Joke from "./Joke";
import axios from "axios";
import './css/JokeList.css';
//import uuidv4 from "uuid";
import { v4 as uuidv4 } from 'uuid';
 

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        //get this from local storage, otherwhise parse the empty array 
        this.state = {jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"), 
        //we have to keep track if we are loading or not
        loading: false 
        };
        //we map the jokes that is already inside jokes, and we just want the text of the jokes inside the set
        this.seenJokes = new Set(this.state.jokes.map(j => j.text)); 
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
     componentDidMount(){
        //if jokes is empty, then get new jokes
        if(this.state.jokes.length === 0) this.getJokes();
       
    }


    async getJokes(){
        try {


        
        //load jokes
         let jokes =[];
         while(jokes.length < this.props.numJokesToGet){
               //tel the api that we are looking for the json version
               let res = await axios.get("https://icanhazdadjoke.com/", {
               headers: {Accept: "application/json"}
             });
             //we check if newJoke is already is in the set or not
             let newJoke = res.data.joke;
             if(!this.seenJokes.has(newJoke )){
                //we push jokes object inside the jokes array
                jokes.push({id: uuidv4(),text: newJoke, votes: 0});
             } else {
                 console.log("Found Duplicate");
                 console.log(newJoke);
             }
             
         }
        this.setState(st => ({

            loading: false,
            //we set jokes, so be an array of the existing state of jokes
            //coma, add the new jokes also that we got from fetching. We combine the old jokes, with the new jokes
            jokes: [...st.jokes, ...jokes]
        }),
            //thiw will go after the state are set
             //will take all that is in the state.jokes, and save it inside local storage
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    } catch(e){
        alert(e); 
        this.setState({loading: false});
    }
        //save data in local - we set the key as jokes . the value is json.stringify, then we add the jokes array
    }

    //will take a id, and a number, negative or positive
    //we get the old states st, and updated jokes, and set it to the old state (st.jokes )
    //then we map it, and for each j(joke), we gonna check if that joke id is equal to that id that was passed in
    //if its is eqaul, then we return the joke(j), but set the votes to be j.votes + delta else we return j
    handleVote(id, delta) {
        this.setState( st => ({
                jokes: st.jokes.map(j => 
                    j.id === id ? {...j, votes: j.votes + delta } : j
            )
        }),
            //thiw will go after the state are set
            //the votes will after this code, still be in the localStorage, after the user refresh etc 
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }

    handleClick(){
        this.setState({loading: true}, this.getJokes);
        //this.getJokes(); we can also have this fucktion hre
        
    }
    render() {
        if(this.state.loading) {
            return(
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin"/>
                    <h1 className="JokeList-title"> Loading </h1>
                </div>
            )
        }
        //a and b, first and second
        //then we check if b.votes is less than a.votes
        //we sort the jokes array, then mape it later in the return
        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                  <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                  <img
                  src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                  <button className="JokeList-getmore" onClick={this.handleClick}>Fetch Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(j =>(
                        //we map it into a joke component
                        <Joke 
                        key={j.id} 
                        votes={j.votes} 
                        text={j.text} 
                        upvote = {() => this.handleVote(j.id, 1)}
                        downvote = {() => this.handleVote(j.id, -1)}
                         />
                    ))}
                </div>
            </div>
        )
    }
}


export default JokeList;