const exampleData = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400,
      "date": '01/05/2019'
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210,
      "date": '01/06/2019'
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290,
      "date": '01/06/2019'
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000,
      "date": '01/06/2019'
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181,
      "date": '01/06/2019'
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500,
      "date": '01/06/2019'
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100,
      "date": '01/06/2019'
    }
  ];

const data = (state = [], action) => {
    switch (action.type) {
        case 'SET_DATA':
            return state;
        default:
            return exampleData;
    }
}

export default data;