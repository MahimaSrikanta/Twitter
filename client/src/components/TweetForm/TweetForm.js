import React, { Component } from 'react';
import './TweetForm.css';

class TweetForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      hashTagValue1:'',
      hashTagValue2:'',
      tweetCount:'1',
      inputValid:false,
      formValid: false,
    }
  }

  validateForm = () => {
    this.setState({formValid: this.state.inputValid})
  }

  validateField = (fieldName, value) => {
    let {formErrors, inputValid} = this.state;
    //Both input hashtag cannot be empty
    if(fieldName === 'hashTagValue1'){
      inputValid = value.length ===0 ? false : true
    };
    this.setState({
      formErrors:formErrors,
      inputValid:inputValid
    }, this.validateForm)
  }

  handleHashTagInput= (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState(
      {[inputName] : inputValue},
      () => this.validateField(inputName, inputValue)
    );
  }

  render() {
    const {hashTagValue1, hashTagValue2, tweetCount} = this.state;
    return(
      <div className="description">
      <form className="form">
        <label>HashTag: </label>
        <input type="text"  name="hashTagValue1" placeholder="Enter #Hashtags separated by commas" value={hashTagValue1} onChange={(event) => this.handleHashTagInput(event)}/>
        <label>Tweets Limit: </label>
        <input type="number" name="tweetCount" placeholder="Enter Limit" min="1" max="20" step="1" value= {tweetCount} onChange={(event) => this.handleHashTagInput(event)}/>
        <button type="button" disabled={!this.state.formValid} value="Submit" className="btn" onClick={() => {this.props.getHashInput(hashTagValue1, hashTagValue2, tweetCount)}}>SUBMIT</button>
      </form>
    </div>
    );
  }
}
export default TweetForm;
