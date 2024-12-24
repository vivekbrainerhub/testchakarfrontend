import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from './redux/store'
import { Provider } from 'react-redux'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ChakraProvider>
     <Provider store={store}>
    <App />
    </Provider>
  </ChakraProvider>
);
