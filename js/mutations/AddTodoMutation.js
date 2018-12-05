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

import {commitMutation, graphql} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';

const mutation = graphql`
  mutation AddTodoMutation($input: TodoCreateInput!) {
    createTodo(data: $input) {
      id
      name
      complete
    }
  }
`;


let tempID = 0;


function commit(environment, text) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name: text,
      },
    },
    configs: [{
      type: 'RANGE_ADD',
      parentID: 'id',
      connectionInfo: [{
        key: 'Todos_todoesConnection',
        rangeBehavior: 'append',
      }],
      edgeName: '',
    }],
  })
}

export default {commit};
