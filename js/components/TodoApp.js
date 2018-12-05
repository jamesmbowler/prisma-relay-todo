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

import AddTodoMutation from '../mutations/AddTodoMutation';
import Todo from './Todo';
import TodoTextInput from './TodoTextInput';

import React from 'react';
import {createFragmentContainer, createPaginationContainer, graphql} from 'react-relay';

class TodoApp extends React.Component {
  _handleTextInputSave = text => {
    AddTodoMutation.commit(
      this.props.relay.environment,
      text
    );
  };
  
  renderTodos() {
    return this.props.data.todoesConnection.edges.map(edge => (
      <Todo key={edge.node.__id} data={edge.node} />
    ));
  }

  _loadMore() {
        if (!this.props.relay.hasMore()) {
          console.log(`Nothing more to load`)
          return
        } else if (this.props.relay.isLoading()) {
          console.log(`Request is already pending`)
          return
        }
    
        this.props.relay.loadMore(10)
      }
  
  render() {
    console.log(this.props.relay)
    console.log('this props todos in todo app', this.props)
    return (
      
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodoTextInput
              autoFocus={true}
              className="new-todo"
              onSave={this._handleTextInputSave}
              placeholder="What needs to be done?"
            />
          </header>
          <section className="main">
            <ul className="todo-list">{this.renderTodos()}</ul>
          </section>
          
        </section>
        <div>
          {this.props.relay.hasMore() &&
          <div onClick={() => this._loadMore()}>More</div>
          }
        </div>
      </div>
    );
  }
}

export default createPaginationContainer(TodoApp, 
  
    graphql`
      fragment TodoApp on Query
        @argumentDefinitions(
          count: {type: "Int", defaultValue: 3}
          cursor: {type: "String"}
        ) {
          todoesConnection(
            first: $count
            after: $cursor
          ) @connection(key:"Todos_todoesConnection", filters: []){
          edges { node {...Todo } cursor }
          pageInfo{
            hasNextPage
            endCursor
          } 

        }
      }
    `,
  
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.data.todoesConnection;
    },
    // This is also the default implementation of `getFragmentVariables` if it isn't provided.
    // getFragmentVariables(prevVars) {
    //   return {
    //     ...prevVars,
    //   };
    // },
    getVariables(props, paginationInfo, fragmentVariables) {
      console.log(paginationInfo)
      console.log('frag variables', fragmentVariables)
      return {
        count: paginationInfo.count,
        cursor: paginationInfo.cursor,
      }
    },
    query: graphql`
      query TodoAppPaginationQuery(
        $count: Int!
        $cursor: String
      ) {
        ...TodoApp @arguments(count: $count, cursor: $cursor)
      }
    `
  }
  
);