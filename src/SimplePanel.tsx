import React, { PureComponent } from 'react';
import { Field, FieldType, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

import { Bar } from 'react-chartjs-2';

interface Props extends PanelProps<SimpleOptions> { }

export class SimplePanel extends PureComponent<Props> {
  getFieldIndex(field: string, fields: Field[]): number {
    for (let i = 0; i < fields.length; i++) {
      if (
        (fields[i].type != FieldType.time && field == '') ||
        field == fields[i].name ||
        field == fields[i].labels?.name
      ) {
        return i;
      }
    }
    return -1;
  }

  getTimeFieldIndex(fields: Field[]): number {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].type == FieldType.time) {
        return i;
      }
    }
    return -1;
  }

  getValoresX(fields: []): Array<number> {
    fields.map((value, i) => {
      fields.push(value);
    });
    return fields;
  }

  getStringFieldIndex(fields: Field[]): number {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].type == FieldType.string) {
        return i;
      }
    }
    return -1;
  }

  render() {
    const { data, width, height } = this.props;

    const number_series = data.series.length;
    const max = data.series[0].fields[0].values.length;
    // console.log(number_series);
    // console.log(max);
    // console.log(data.series[0].fields);

    let valuess = [] as any;
    let valoresX = [] as any;
    let valoresY = [] as any;
    let nomes = [] as any;
    let cores1 = [] as any;
    let cores2 = [] as any;

    for (let i = 0; i < max; i++) {
      nomes.push(data.series[0].fields[0].values.get(i));
      valuess.push(data.series[0].fields[number_series].values.get(i));
    }
    // console.log(nomes);
    // console.log(valuess);

    valuess.map((value, i) => {
      valoresX.push(i);
      valoresY.push(value);
    });
    // console.log(valoresX);
    // console.log(valoresY);

    function get_random_color1() {
      var color = "";
      for (var j = 0; j < max; j++) {
        var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
        while (color.length < 6) {
          color = "0" + color;
        }
        cores1.push("#" + color);
      }
      return cores1
    }

    function get_random_color2() {
      var color = "";
      for (var j = 0; j < max; j++) {
        var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
        while (color.length < 6) {
          color = "0" + color;
        }
        cores2.push("#" + color);
      }
      return cores2
    }

    const datas = {
      labels: nomes,
      datasets: [
        {
          data: valoresY,
          borderWidth: 1,
          backgroundColor: get_random_color1(),
          hoverBackgroundColor: get_random_color2(),
        }
      ]
    };

    const legendOpts = {
      display: false,
      position: 'top',
      fullWidth: true,
      reverse: false,
      labels: {
        fontColor: 'rgb(255, 99, 132)',
      }
    };

    return (
      <Bar
        data={datas}
        width={width}
        height={height}
        options={{
          maintainAspectRatio: false
        }
        }
        legend={legendOpts}
      >
      </Bar >
    );
  }
}

// export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
//   const theme = useTheme();

//   const margin = { left: 30, top: 30, right: 30, bottom: 30 };

//   const chartWidth = width - (margin.left + margin.right);
//   const chartHeight = height - (margin.top + margin.bottom);

//   let points: any = [];
//   // for (let i = 0; i < 100; i++) {
//   //   points.push({ x: i * Math.random(), y: i * Math.random() });
//   // }

//   // for(let i = 0; i < data.series.length; i++){
//   //   console.log(data['series'[i]])
//   // }

//   // for (let i = 0; i < data.series.length; i++) {
//   //   for (let j = 0; j <= data.series.length; j++) {
//   //     console.log('teste 1');
//   //     console.log(data['series'][i]['fields'][j]['values']);
//   //     for (let a = 0; a < data['series'][i]['fields'][j]['values'].length; a++) {
//   //       console.log('x = ');
//   //       console.log(data['series'][i]['fields'][j]['values'].get(a));
//   //     }
//   //   }
//   // }

//   // for (let i = 0; i < data.series.length; i++) {
//   //   for (let j = 0; j <= data.series.length; j++) {
//   //     console.log('teste 1');
//   //     console.log(data['series'][i]['fields'][j]['values']);
//   //     for (let a = 0; a < data['series'][i]['fields'][j]['values'].length; a++) {
//   //       console.log('x = ');
//   //       console.log(data['series'][i]['fields'][j]['values'].get(a));
//   //     }
//   //   }
//   // }

//   // for (let i = 0; i < data.series.length; i++) {
//   //   for (let j = 0; j <= data.series.length; j++) {
//   //     console.log(data['series'][i]['fields'][j]['values'].get(a));
//   //     // points.push({ x: data['series'][i]['fields'][j]['values'].get(a) });
//   //   }
//   // }

//   const availabilityResults = data['series'][0]['fields'][1]['values'].length;

//   for (let a = 0; a < availabilityResults; a++) {
//     for (let i = 0; i < data.series.length; i++) {
//       // console.log(data['series'][i]['fields'][i]['values'].length);
//       // console.log(data['series'][i]['fields'][i]['values'].get(a));
//       // console.log(data['series'][i]['fields'][i + 1]['values'].get(a));
//       points.push({
//         x: data['series'][i]['fields'][i]['values'].get(a),
//         y: data['series'][i]['fields'][i + 1]['values'].get(a),
//       });
//     }
//   }

//   // console.log(data['series'][0]['fields'][0]['values'].get(0));
//   // console.log(data['series'][0]['fields'][1]['values'].get(0));
//   // console.log(data['series'][0]['fields'][0]['values'].get(1));
//   // console.log(data['series'][0]['fields'][1]['values'].get(1));
//   // console.log(data['series'][0]['fields'][0]['values'].get(2));
//   // console.log(data['series'][0]['fields'][1]['values'].get(2));

//   // console.log(data['series'][0]['fields'][0]['values']); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   // console.log(data['series'][0]['fields'][1]['values']); // [70, 49, 38, 90, 94, 14, 98, 26, 67, 6]

//   // console.log(data['series']);
//   // console.log(data['series'][0]);
//   // console.log(data['series'][1]);
//   // console.log(data['series'][0]['fields'][0]['values']);
//   // console.log(data['series'][0]['fields'][1]['values']);

//   const xScale = d3
//     .scaleLinear()
//     .domain([0, 100])
//     .range([0, chartWidth]);

//   const yScale = d3
//     .scaleLinear()
//     .domain([0, 100])
//     .range([chartHeight, 0]);

//   const xAxis = d3.axisBottom(xScale);
//   const yAxis = d3.axisLeft(yScale);

//   return (
//     <svg width={width} height={height}>
//       <g transform={`translate(${margin.left}, ${margin.top})`}>
//         <g>
//           {points.map((d: any) => (
//             <circle cx={xScale(d.x)} cy={yScale(d.y)} r={5} fill={theme.palette.greenBase}></circle>
//           ))}
//         </g>
//         <g
//           transform={`translate(0, ${chartHeight})`}
//           ref={node => {
//             d3.select(node).call(xAxis as any);
//           }}
//         />
//         <g
//           ref={node => {
//             d3.select(node).call(yAxis as any);
//           }}
//         />
//       </g>
//     </svg>
//   );
// };
