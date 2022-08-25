import React, { useState } from "react";
import { Container, FormGroup, Form, Label, Input, Col, Row, Button } from "reactstrap";
import APICalls from "../api/APIcalls";
import ResultCard from "../results/ResultCard";


function SearchForm(){
  const [formData, setFormData] = useState({
    pokeSearch: '',
  });
  const [formErrors, setFormErrors] = useState([]);
  const [results, setResults] =useState([])
  const [isHovering, setIsHovering] = useState(false);
  

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  }; 

  //Handle pokemonsearch for single pokemon -> api -> APICalls
  async function handleSubmit(evt){
    evt.preventDefault()
    let pokeSearch = formData.pokeSearch
    if(pokeSearch.length <= 0){
      setFormErrors("Value can't be empty.")
      return
    }
    try{
      let result = await APICalls.searchPokeAPIByForm(pokeSearch)
      setResults([result])
    } catch(err){
      console.log(err)
      setFormErrors('Search must be a valid Pokemon name.')
    }

  } 
  
  //Update form data
  function handleChange(evt) {
    evt.preventDefault()
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }
  
  return (  
      <Container className="mx-auto mt-5 col-lg-11 bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="text-center">
          <FormGroup row className="p-2 mx-auto mb-2 mr-sm-2 mb-sm-0 col-lg-10">
            <Label for="pokeSearch" className="text-center mr-sm-2">
              Search PokeAPI:
            </Label>
            <Col sm={12} className="align-center">
              <Input
                name="pokeSearch"
                pattern="[A-Za-z]*"
                className="form-control text-center"
                value={formData.pokeSearch}
                onChange={handleChange}
                autoComplete="pokeSearch"
                default=""
                placeholder="Search PokeAPI"
              />
            </Col>
          </FormGroup>
          { formErrors.length
          ? <p className="text-danger"><small>{formErrors}</small></p>
          : null}
          </Row>
          <div className="text-center">
            <Button className="text-center col-lg-6 border border-dark rounded-pill" 
              style={{
                backgroundColor: isHovering ? '#6383A6' : '#063970',
                color: isHovering ? 'black' : 'white',
              }} 
              size="lg" 
              onSubmit={handleSubmit}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              >
              Search PokeAPI
            </Button>
          </div>
        </Form>
        <Row>
        { results.length ? 
          <Row className="mx-auto p-2 mt-2 p-1 col-sm-12 text-3xl">
            {results.map(( result ) => (
          <ResultCard
            key={result}
            result={result}
          />
        ))}
          </Row>
          : null}
        </Row>
      </Container>   
  )
}

export default SearchForm;