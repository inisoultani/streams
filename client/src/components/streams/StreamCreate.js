import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  componentDidMount() {}

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Create a stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createStream: (formValues) => dispatch(createStream(formValues)),
  };
};

export default connect(null, mapDispatchToProps)(StreamCreate);
