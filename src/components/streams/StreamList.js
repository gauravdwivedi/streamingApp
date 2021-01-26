import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/* <button className="ui button primary">Edit</button> */}
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }
  renderList() {
    return this.props.streams
      .filter((stream) => stream.userId === this.props.currentUserId)
      .map((stream) => {
        return (
          <div className="item key={stream.id}">
            {this.renderAdmin(stream)}
            <i className="large middle aligned icon camera" />
            <div className="content">
              <Link to={`/streams/${stream.id}`} className="header">
                {stream.title}
              </Link>
              <div className="description">{stream.description}</div>
            </div>
          </div>
        );
      });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new/" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //TODO: object.values is a builtIn Javascript function
  //it's going to take an object as an argument
  //all of the different values inside of that object are going to be pulled out and then inserted into an array.
  //it turns all the values inside that object into an array.
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
