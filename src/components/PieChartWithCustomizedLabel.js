import React from "react"
import { PieChart, Pie, Tooltip, Cell } from "recharts"
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export class CustomTooltip extends React.Component(){
    constructor(props){
        super(props)
    }
    
  
    getIntroOfPage(label) {
        console.log(label)
      if (label === 'Page A') {
        return "Page A is about men's clothing";
      } else if (label === 'Page B') {
        return "Page B is about women's dress";
      } else if (label === 'Page C') {
        return "Page C is about women's bag";
      } else if (label === 'Page D') {
        return "Page D is about household goods";
      } else if (label === 'Page E') {
        return "Page E is about food";
      } else if (label === 'Page F') {
        return "Page F is about baby food";
      }
    }
  
    render() {
      const { active } = this.props;
  
      if (active) {
        const { payload, label } = this.props;
        return (
          <div className="custom-tooltip">
            <p className="label">{`${label} : ${payload[0].value}`}</p>
            <p className="intro">{this.getIntroOfPage(label)}</p>
            <p className="desc">Anything you want can be displayed here.</p>
          </div>
        );
      }
  
      return null;
    }
  }


export default function PieChartWithCustomizedLabel(){

  	return (
    	<PieChart width={1500} height={1000} >
        <Tooltip content={<CustomTooltip/>} />
        <Pie
          data={data} 
          cx={300} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }



