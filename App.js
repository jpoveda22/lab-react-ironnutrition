import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import foods from './foods.json';
import FoodBox from './FoodBox.js'


class App extends Component {
state={
  foods,
  showForm:false,
  allFoods: foods,
  
}



showFoods = () => {
  let foodList = this.state.foods.map((eachFood,i)=>{
    return <FoodBox key = {i} {...eachFood} />
  })
  return foodList;
}

handleSubmit = (e) => {
  e.preventDefault()
  console.log('submit ',this.state)
  let newFoods = [...this.state.foods]
  newFoods.unshift({
    name    :this.state.name,
    image   :this.state.image,
    calories:this.state.calories
  })

  this.setState({
    foods:newFoods,
    allFoods:newFoods
  })

}

handleTypingIntoInputBoxes = (e) => {
  console.log(e.target.name, '=', e.target.value)
  this.setState({
    [e.target.name]:e.target.value //calories:5000, name:pizza, image:http://image.png
  })
}

showMeTheForm = () => {
  if(this.state.showForm){
  return (
    <form onSubmit={this.handleSubmit}>
      <input type="text" onChange={this.handleTypingIntoInputBoxes} name="name" placeholder="name" />
      <input type="text" onChange={this.handleTypingIntoInputBoxes} name="calories" placeholder="calories" />
      <input type="text" onChange={this.handleTypingIntoInputBoxes} name="image" placeholder="image" />
      <input type="submit" />
    </form>
  )
  } else {
    return ''
  }
}

toggleFoodFormState = () => {
  this.setState({
    showForm:!this.state.showForm  //opposite true = !false, false = !true
  })
}



searchFood = (e) => {
  console.log(e.target.value, )
  let newFoods = [...this.state.allFoods] //made a copy 
  let filteredFoods = newFoods.filter(eachFood=>{ //filtered the copy 
    return eachFood.name.toLowerCase().includes(e.target.value.toLowerCase())  //piz {name:Pizza} what u type is equal to the name of the food return it 
  })
  this.setState({ 
    foods:filteredFoods //set the state to be the new goods
  })

}





render() {
  return (
    <div className="App">
      <br></br>
      <br></br>
      <button onClick={this.toggleFoodFormState}>Add Food</button>
      <input type="text" placeholder="Search .... " name="search" onChange={this.searchFood}/>
      {this.showMeTheForm()}
      <br></br>
      {this.showFoods()}
      <br></br>
      

    </div>
  );
}
}

export default App;
