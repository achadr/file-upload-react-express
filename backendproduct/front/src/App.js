import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
  state = { 
            selectedFile: null, 
            loaded: 0, 
          }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  handleUpload = (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post("http://localhost:8000/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <form>
        <div className="form-group container">
          <label htmlFor="exampleFormControlFile1"><h3>File upload</h3></label>
          <div className="form-style">
            <input onChange={this.handleselectedFile} type="file" name='file' className="form-control-file" id=""/>
            <button onClick={this.handleUpload} className="btn btn-success">Upload</button>
          </div>
          <div> {Math.round(this.state.loaded,2) } %</div>
        </div>
    </form>
    );
  }
}

export default App;
