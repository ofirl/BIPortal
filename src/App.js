import React from 'react';
// import logo from './logo.svg';
import './App.css';
import TemplatePage from './pages/template/Template'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar } from 'recharts';

function App() {
  return (
    <TemplatePage>
      {data => (
        <React.Fragment>

          <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
            <Paper style={{ padding: '20px', margin: '10px' }}>
              <ResponsiveContainer height={500} width={"100%"}>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
            <Paper style={{ width: '50%', padding: '20px', margin: '10px', height: '50%' }}>
              <ResponsiveContainer height={"100%"} width={"100%"}>
                <ComposedChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                  <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                  <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

        </React.Fragment>
      )}


    </TemplatePage>
  );
}

export default App;
