import * as React from 'react';
import Routes from '../router';
import { BrowserRouter } from  'react-router-dom';
import { store } from '@/store'
import { Provider } from 'react-redux'
import { Provider as BusProvider } from '@/hooks/usebus';
const App = () => {
return (
  <BusProvider>
    <Provider store={store}>
      <BrowserRouter basename='/'>{Routes()}</BrowserRouter>
    </Provider>
  </BusProvider>
)
}

export default App;