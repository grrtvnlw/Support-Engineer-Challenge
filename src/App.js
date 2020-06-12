import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      imageUrl: '',
      searchUrl: '',
      name: ''
    }
  }

  getNewComic = () => {
    fetch('https://xkcd.now.sh/?comic=latest')
    .then(res => res.json())
    .then(data => {
      this.setState({ imageUrl: data.img });
    })
  }

  componentDidMount() {
    this.getNewComic();
  }

  onChange = (e) => {
    this.setState({
      name: Number(e.target.value)
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let id = this.state.name
    fetch(`https://xkcd.now.sh/?comic=${id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({ searchUrl: data.img });
    })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to="/">Latest</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/search">
              <Search />
              <form onSubmit={ this.onSubmit }>
                <label for="comicSearch">Enter a value from 1-2219</label>
                <input type="text" name="comicSearch" className="searchInput" value={ this.state.name } onChange={ this.onChange }></input>
                <button type="submit" className="searchSubmit">Search</button>
              </form>
                <div>
                  <img width="500" src={ this.state.searchUrl } className="searchImage" />
                </div>
            </Route>
            <Route path="/">
              <Latest />
              <main>
                <div>
                  <img width="500" src={ this.state.imageUrl } />
                </div>
              </main>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Latest() {
  return <h2>Latest</h2>;
}

function Search() {
  return <h2>Search</h2>;
}
