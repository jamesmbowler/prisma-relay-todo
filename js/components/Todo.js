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


import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import classnames from 'classnames';

class Todo extends React.Component {

  render() {
    //console.log(this.props)
    return (
      <li
        className={classnames({
          completed: this.props.data.complete,
        })}>
        <div className="view">
        {this.props.data.name}
        </div>
      </li>
    );
  }
}

export default createFragmentContainer(
  Todo,
  graphql`
    fragment Todo on Todo {
      id
      name
      complete
    }
  `,
);