import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./App";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
})

const rootNode = document.getElementById('root')

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>, rootNode
)
