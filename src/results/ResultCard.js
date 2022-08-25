import React, { useState } from "react";
import { Col, Button, Row } from "reactstrap";

function ResultCard({result}) {
  const [isHoveringIMG, setIsHoveringIMG] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [favorite, setFavorite] = useState([])

  //handle button hovers
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  }; 

  //Handle mouse over of image to pop up additional information about pokemon
  const handleMouseOver = () => {
    setIsHoveringIMG(true);
  };

  const handleMouseOut = () => {
    setIsHoveringIMG(false);
  };
  
  //handle local storage
  //get data from local storage to see if a pokemon has been favorited. 
  const [isOpen, setOpen] = React.useState(
    JSON.parse(localStorage.getItem('is-open')) || false
  );
  
  //handle adding pokemon to localstorage
  const handleToggle = () => {
    localStorage.setItem('is-open', JSON.stringify(!isOpen));
    setOpen(!isOpen);
    setFavorite([result])
    
  };
  
  //Clear localstorage of pokemon, reset Localstorage state and turn button to original color
  const handleRemoveFromLocalStorage = () => {
    localStorage.clear()
    setOpen(!isOpen)
    handleMouseLeave()
    setFavorite([])
  }
  

/* Result has the following: 
abilities:  [{…}, {…}] base_experience, forms: [{…}] game_indices: [{…}]
height, held_items: [] id: is_default: location_area_encounters: "https://pokeapi.co/api/v2/pokemon/6/encounters"
moves: [{…} ] name: order: past_types: [] species: {name: , url: ''}
sprites: {back_default: '', back_female: null, back_shiny: '', back_shiny_female: null, front_default: '', }
stats: [{…}]
types: [{…}]
weight:
*/
console.log(favorite[0])
  return (
    <Col className="ResultCard p-2 col-md-12">
      <div 
      className="card text-left text-md-right d-flex ml-auto border border-white mt-1 p-1" 
      key={result.id} 
      id={result.id}>
        <h2>Name: {result.name}</h2>
        <Row>
          <Col>
          <img 
            alt="Pokemon"
            src={result.sprites["front_default"]} 
            className="mx-auto col-md-4 w-100 "
            onMouseOver={handleMouseOver} 
            
          />
          </Col>
          <Col className="mt-2 mx-auto col-md-4">
            {isHoveringIMG ?
            <div 
              className="p-2"
              style={{
                backgroundColor: '#063970',
                color: 'white'
              }}
            >
            <h3 className="text-center">Description:</h3>
            <div className="ml-2">
              <Row>
                <Col className="text-center text-md-right"><h5>XP:</h5></Col>
                <Col>{result.base_experience}</Col>
                <Col></Col>
              </Row>
             
              <h5>Forms:</h5>
               {result.forms.map(( form ) => (
                  <p key={form.name}>
                  <a 
                    href={form.url} 
                    target="_blank" 
                    rel="noreferrer"
                    >{form.url}</a>  
                  </p>
                ))}
              <Row>
                <Col><h5>Species:</h5></Col>
                <Col><p key={result.species.name}>{result.species.name}</p></Col>
                <Col></Col>
              </Row>
              <Row>
              {result.stats.map(( stat ) => (
                  <Col key={stat.stat.name} className="mx-auto p-2">
                    <p>{stat.stat.name}: {stat.base_stat}  </p>
                  </Col> 
                ))}
              </Row>
            </div>
            <div className="text-center">
            <Button className="btn btn-center p-2 mb-2 col-lg-6 border border-dark rounded-pill" 
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                }} 
                size="md" 
                onClick={handleMouseOut}
                >Close description</Button>
            </div>
          </div>
          : <>
          <h4>Order:</h4>
          <p>{result.order}</p>
          <p>Mouse over image for more info!</p>
          </>
          }
        </Col>
        <Col>
        <h4>Abilities:</h4>
          <ul className="text-left col-md-4">
          {result.abilities.map(( ability ) => (
            
            <a 
              key={ability.ability.name}
              href={ability.ability.url} 
              target="_blank"
              rel="noreferrer nofollow"
              >{ability.ability.name}</a>  
          ))}
          </ul>
        </Col>
        </Row>
      </div>
      <Row>
      <Col>
      {!isOpen ? 
        <Button 
        className="mx-auto mt-2 col-lg-10 border border-dark rounded-pill" 
        style={{
          backgroundColor: isHovering ? '#6383A6' : '#063970',
          color: isHovering ? 'black' : 'white',
        }} 
        size="md" 
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        Add to Favorites!
        </Button>
      : 
        <Button
          className="col-lg-10 text-white text-center p-1 mx-auto border border-white disabled m-2  rounded-pill"
          size="lg" 
          style={{backgroundColor:"#063970"}}
        >
         Saved!
        </Button>
        }
        </Col>
        <Col>
        {!isOpen ? <></> :
        <Button
          className="col-lg-10 text-white text-center p-1 mx-auto border border-white enabled m-2  rounded-pill"
          size="lg" 
          style={{backgroundColor:"#063970"}}
          onClick={handleRemoveFromLocalStorage}
        >
         Delete
        </Button>}
        </Col>
      </Row>
      <Row>
          <h1 className="mt-2">Favorite Pokemon</h1>
          {favorite.length ? <> 
          
          <Col>
          <img 
            alt="Pokemon"
            src={favorite[0].sprites["front_shiny"]} 
            className="mx-auto col-md-4 w-100 "
            onMouseOver={handleMouseOver} 
            
          />
          </Col>
          <Col className="mx-auto">
            <h2>{favorite[0].name}</h2>
          </Col>
          </> : <><h5>No favorite added!</h5></> }
      </Row>
    </Col>
  )
}

export default ResultCard;