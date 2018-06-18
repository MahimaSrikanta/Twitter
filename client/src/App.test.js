import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import TweetForm from './components/TweetForm/TweetForm';
import TweetList from './components/Tweets/TweetList';


configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it('should render TweetForm component for tweet hashtag search on load', () => {
      expect(wrapper.find(TweetForm)).toHaveLength(1);
    });

    it('should not render TweetList and Sentiments Components when no hashTag is searched', () => {
      expect(wrapper.find(TweetList)).toHaveLength(0); 
    });

    it('should render TweetList Component when hashTag is searched and has received a list of tweets from server', () => {
        wrapper.setState({tweets:[{data:{text:"Hello Linqia"}}]});
        expect(wrapper.find(TweetList)).toHaveLength(1); 
    });

    it('should show error message when error is received from the server while searching for hashtag', () => {
      wrapper.setState({error:'Error 404 not found'});
      expect(wrapper.find(TweetList)).toHaveLength(0); 
    });
});