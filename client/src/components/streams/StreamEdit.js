import React from 'react';
import { connect } from 'react-redux';

import { updateStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream();
  }

  renderEditForm = () => {
    if (this.props.stream) {
      return `${this.props.stream.title} - ${this.props.stream.description}`;
    } else {
      return 'Loading...';
    }
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.updateStream(this.props.match.params.id, formValues);
  };

  renderEditForm = () => {
    if (this.props.stream) {
      return (
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={{
            title: this.props.stream.title,
            description: this.props.stream.description,
          }}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <h3>Edit a stream</h3>
        {this.renderEditForm()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateStream: (id, formValues) => dispatch(updateStream(id, formValues)),
    fetchStream: () => dispatch(fetchStream(ownProps.match.params.id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
