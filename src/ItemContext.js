import React, { createContext } from "react";
import { render } from "react-dom";
import items from "./item-data";
import App from "./App";

export const ItemContext = createContext(null);

render (
    <ItemContext.Provider value = {{ items }}>
        <App />
    </ItemContext.Provider>,
    document.getElementById("root")
);