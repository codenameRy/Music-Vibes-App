import React, { Component } from "react";
import actions from '../../services/index'


class SearchBar extends Component {
    state = {
        searchResults: []
    }

    handleChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        console.log(e.target)
    this.setState({ 
        // [e.target.name]: e.target.value
        searchvalue: e.target.value
    })
  };



  displaySearchResults = () => {
    return this.state.searchResults.map((eachSong) => {
      return <div key={eachSong.result.id}>
      <h2>{eachSong.result.full_title}</h2>
      <button onClick={() => this.getLyricsAPI(eachSong.result.title)}>
      <img
            // style={{ width: "50px" }}
            src={eachSong.result.song_art_image_thumbnail_url}
            alt={eachSong.result.song_art_image_thumbnail_url}
          />
      </button>
      </div>;
    });
  };

  getLyricsAPI = async (song) => {
    let res = await actions.getLyrics(song)
    console.log(res)
    this.setState({
      lyrics: res.data
    })
  }

  submitButton = async (e) => {
      e.preventDefault()
    let lyrics = await actions.getArtist(this.state.searchvalue)
    console.log(lyrics.data)
    this.setState({ 
        searchResults: lyrics.data.response.hits
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitButton} ><label>Music Search</label>
        <input name="searchValue" onChange={(e) => this.handleChange(e)} />
        <button type="submit">Submit</button>
        </form>
        {this.state.searchResults ? this.displaySearchResults() : ""}
      </div>
    );
  }
}

export default SearchBar;
