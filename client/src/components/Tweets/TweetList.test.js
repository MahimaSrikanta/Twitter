import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TweetList from './TweetList';
import Tweets from './Tweets';
import Sentiments from '../Sentiments/Sentiment';

configure({adapter: new Adapter()});

describe('<TweetList />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TweetList tweetList= {[
            {id:"Hello Linqia",favorite_count:100, retweet_count:0},
            {id:"Assignment",favorite_count:10,retweet_count:10}]}
            sentiments={[{data:{text:"Hello Linqia"}}]}/>);
    });

    it('should render 2 Tweets components when there is a list of 2 tweets to be displayed', () => {
      expect(wrapper.find(Tweets)).toHaveLength(2);
    });

    it('should not render TweetList and Sentiments Components when no hashTag is searched', () => {
        wrapper.setState({tweetList: []});
        expect(wrapper.find(Tweets)).toHaveLength(0);
        expect(wrapper.find(Sentiments)).toHaveLength(0);
    });

    it('should render Sentiments component when display Sentiments button is selected', () => {
        wrapper.setState({displaySentiments:true});
        expect(wrapper.find(Sentiments)).toHaveLength(1); 
    });

    it('should render only Tweets component when display Tweets button is selected', () => {
        wrapper.setState({displaySentiments:false});
        expect(wrapper.find(Tweets)).toHaveLength(2); 
    });
    
    it('should sort the tweets in ascending order when sortBy favorites is selected', () => {
        wrapper.find('select').simulate('change',{
            preventDefault :() => {},
            target: { value: 'favorite_count' }});
        expect(wrapper.state().tweetList[0]['id']).toEqual('Assignment');
    });

    it('should sort the tweets in ascending order when sortBy Retweets is selected', () => {
        wrapper.find('select').simulate('change',{
            preventDefault :() => {},
            target: { value: 'retweet_count' }});
        expect(wrapper.state().tweetList[0]['id']).toEqual('Hello Linqia');
    });
    
});