import React from 'react'
import { Route, Switch } from 'react-router'
import './App.css'
import Home from "./containers/Home/Loadable";
import axios from 'axios';
//import Config from "./Config";

class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      user: null,
    };

    let key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhjMTdjZDIyYjlkZWRlMTBmYmQ1MTc2YWU2YzBlZTc3YzU3YWI4MzJlN2IxOTNlYjhmMzJiYjlkNzA3OTdiOWFlZTNiMTFmNDI1NThhYmFlIn0.eyJhdWQiOiIyIiwianRpIjoiOGMxN2NkMjJiOWRlZGUxMGZiZDUxNzZhZTZjMGVlNzdjNTdhYjgzMmU3YjE5M2ViOGYzMmJiOWQ3MDc5N2I5YWVlM2IxMWY0MjU1OGFiYWUiLCJpYXQiOjE1NjEzODg1MzMsIm5iZiI6MTU2MTM4ODUzMywiZXhwIjoxNTkzMDEwOTMzLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.llIEBbi0ze9mqAa5-nlx8zVAAluJM4ahVw5ZuihcPIXCrsDmFpELyBwyYMa1SJh3jc6Ej2P-SjIFSZ7zIYb6V2j2xhUOQ_YEmFrmT8C2ZcH5sohVjpbOVbcN3X8Tn5a3CpKTP4OoepPjhAfuGHn4qu65bjfiGA62kilRX8oYu1xayYOzZ3VAYn3NzPvoHgPxIu7ogEaw5B_UQDzZlB-PyCfr7xAEWSKfRYXnaDiC9n5zG7RnKs3amSSMRE-auHbfYZB6K6oEdumKk8DA2WJJbVZ3KPj3ob3-CamtWOlgk4ZezGtIPp_n8Au4SLY2Z53pZAtPDVxGy2OZtHW-yALGRAcNvWX9aIeKb_C9GQsGM7xByrbVHZy2yorgRCRc1KggFEsI3tmbE1fFfapZ8Stw8KEHuhQvEvylB6dbtWnWaf27W1sjrNJSukYMZgyQSdCmArTXxi34nBjHxjXIZ_ojox5-14m31n7QbwMhWhs4J2x0CXqy96fFgz90vrveMWlmHxm_CQK95o7nJbUIOoazwe_rJZYVJFVoxLMAlca8oaSaB2jn8X9IChz2tjsXmyH9QYefi---dgphqnA-Of4BD_3Vf1N_A9kXsC6HcedjYGBTV8CYZ9t9w1pbeUldE4eyglXBGRrqYIRfp3r9Y4leswskQczyye1iM3QqpLyFtPI';
  }

  render(){
    const {user, connectionStatus, statusColors} = this.state;

    return <div className={'main-wrapper'}>
      <header>
      </header>
      <main className='app-content'>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </main>
    </div>
  }
}

export default App
