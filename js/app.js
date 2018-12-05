/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import 'todomvc-common';

import React from 'react';
import ReactDOM from 'react-dom';

import {QueryRenderer, graphql} from 'react-relay';
import {Environment, Network, RecordSource, Store} from 'relay-runtime';

import TodoApp from './components/TodoApp';

function fetchQuery(operation, variables) {
  return fetch('http://localhost:4466', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTQzNjA1ODU5LCJleHAiOjE1NDQyMTA2NTl9.fSnUT4spAoktQ51NA-xf5gvoT9Wzc0MdvSDXFKCOlzI' 
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
    query appQuery{
        ...TodoApp
      
    }
    `}
    variables={{count:3}}
    render={({error, props}) => {

      if (props) {
        console.log('appquery', props)
        
        return <TodoApp data={props} />;
      } else {
        console.log('error', error)
        return <div>Loading</div>;
      }
    }}
  />,
  document.getElementById('root'),
);
