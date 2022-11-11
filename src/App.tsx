import React from 'react';
import './App.css';
import Store from './Store';
import { Provider } from 'react-redux';
import { store } from './features/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Store />
      </Provider>
    </div>
  );
}

export default App;
