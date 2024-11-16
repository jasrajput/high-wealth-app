import React from 'react';
import {
    
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/theme';


const WidgetPieChart = () => {

    const data = [
        {
          name: "Seoul",
          population: 28000000,
          color: "#BB85FF",
        },
        {
          name: "Toronto",
          population: 21500000,
          color: "#09B6C1",
        },
      ];

    return(
        <>
            <PieChart
                data={data}
                width={300}
                height={300}
                chartConfig={{
                    color: (opacity = 1) => 'rgb(255,255,255)',
                    labelColor: () => "#fff",
                }}
                hasLegend={false}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"70"}
                avoidFalseZero={true}
                //center={[0, 0]}
                //absolute
            />
        </>
    )
}




export default WidgetPieChart;