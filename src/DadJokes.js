import React, { Component } from 'react';
//import Card from "./Card"
//import "./Deck.css";
import axios from "axios";
import Joke from "./Joke";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
class DadJokes extends Component {
    constructor(props){
        super(props);
        //every time we request a card, we gonna add this information inside drawn array
        this.state = {deck: null, jokes: [] };
        this.getJoke = this.getJoke.bind(this);
        
    }

    
    async componentDidMount(){
        
        //we wait until this is finished 
        let joke = await axios.get("https://api.icndb.com/jokes/random");
        //deck includes info about the respons itself, so its deck.data that has the api info we need 
        //this.setState({deck: deck.data}); 
        console.log("jokes: " +  joke.data.value.joke);

        //if the array dont have 10 jokes, then add until we have it
        console.log("stpr i faktura " + this.state.jokes.length);
        //if(this.state.jokes.length !== 10){
            //console.log("stpr i faktura " + this.state.jokes.length);
            this.state.jokes.length += this.state.jokes.length ;
            this.setState (oldState => ({
                jokes: [
                    ...oldState.jokes,
                    {
                        id: joke.data.value.id,
                        joke: joke.data.value.joke,
    
                    }
                ]
            }))
        
          


        /* axios.get('https://api.icndb.com/jokes/random')
      .then((response) => {       
        console.log(response.data.value.joke);
      }) */

    }

    async getJoke(){
         //we wait until this is finished 
         let joke = await axios.get("https://api.icndb.com/jokes/random");
         //deck includes info about the respons itself, so its deck.data that has the api info we need 
         //this.setState({deck: deck.data}); 
         //console.log("jokes: " +  joke.data.value.joke)
         
         this.setState (oldState => ({
             jokes: [
                 ...oldState.jokes,
                 {
                     id: joke.data.value.id,
                     joke: joke.data.value.joke,
 
                 }
             ]
         }))

        
    }

    /* async getCard(){

        let id = this.state.deck.deck_id;
        try {
            //request a new card
            //make request using deck_id
            let cardUrl = `${API_BASE_URL}/${id}/draw/`;
            let cardRes = await axios.get(cardUrl);
                
                //if its no more cards, then give a error message
                //if its not true, then give a error
                if(!cardRes.data.success){
                    throw new Error("No card remaining")
                }

                //capture the card data here
                let card = cardRes.data.cards[0];
                this.setState (oldState => ({
                    //we set drawn to be a new array, that contains all the old data with ...oldState.draw
                    //and we also add inn a new object where we have a id, image and name
                    drawn: [
                        //copy everything from the old array ...
                        //add in a new object 
                        ...oldState.drawn, 
                        {
                            id: card.code,
                            image: card.image,
                            name: `${card.value} of ${card.suit}`
                        }
                            ]
                }));

        } catch (err) {
            alert(err)
        }
        
          //set state using new card info from api
    } */

    render(){
        //we call each card c
        //then we return a card component
        /* const cards = this.state.drawn.map(c => (
            <Card key = {c.id} name = {c.name}  image={c.image} />
        )); */
        
        
            const jokes = this.state.jokes.map(j => (
                <Joke key = {j.id} joke = {j.joke} />
                
                //j.joke
            ));
        
        

        console.log("stpr i faktura " + this.state.jokes.length);

        return(
         /*    <div>
                    <h1 className="Deck-title">♢Dad Jokes♢</h1>
                    <h2 className="Deck-title subtitle"> ♢A little demo made with React♢</h2>
                    <button className="Deck-btn" onClick={this.getCard}> Get Card </button>
                    <div className="Deck-cardarea">{cards}</div>                   
            </div> */
            <div>
                
                
                        <div className="DadJokes">{jokes}</div>
                    
                
                <button onClick={this.getJoke}>Get joke</button>
                

            </div>
            
        );
    }
}

export default DadJokes;