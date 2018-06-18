import React from 'react';
import {Doughnut} from 'react-chartjs-2';



const data = {
	labels: [
        'Joy',
        'Fear',
		'Anger',
        'Disgust',
        'Sadness'
	],
	datasets: [{
		data: [0, 0, 0, 0],
		backgroundColor: [
        '#36A2EB',
        '#7e7e7e',
		'#FF6384',
        '#FFCE56',
        '#bba3d0'
		],
		hoverBackgroundColor: [
        '#36A2EB',
        '#7e7e7e',
		'#FF6384',
        '#FFCE56',
        '#bba3d0'
		]
	}]
};

const constructData = (array) => {
    const data =[0,0,0,0,0];
    array && array.foreach(key => {
      if(key['code'] !== 400){
        data[0] += key['joy'];
        data[1] +=key['fear'];
        data[2] +=key['anger'];
        data[3] +=key['disgust'];
        data[4] +=key['sadness'];
      }
    });
    return data;
}
const Sentiments = (props) => {
    data.datasets[0].data = constructData(props.sentiments.data)
  return(
    <div>
    <h2>Sentiments Analysis </h2>
    <Doughnut data={data} />
  </div>
  )
}

export default Sentiments;