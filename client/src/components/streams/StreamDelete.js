import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import history from '../../history';
import { deleteStream, fetchStream } from '../../actions';
import { Link } from 'react-router-dom';

const StreamDelete = (props) => {
  const { fetchStream } = props;
  useEffect(
    () => {
      fetchStream();
    },
    [fetchStream],
    { capture: true },
  );

  const closeModal = () => {
    history.push('/');
  };

  const renderActions = () => {
    return (
      <React.Fragment>
        {props.stream && (
          <div className="ui red button" onClick={props.deleteStream}>
            Delete
          </div>
        )}
        <Link className="ui button" to="/">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  const renderMessage = () => {
    console.log(props.stream);
    if (props.stream) {
      return `Are you sure you want to delete stream with title : ${props.stream.title}`;
    }
    return `There is no stream data with id : ${props.match.params.id}`;
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderMessage()}
      actions={renderActions()}
      onDismiss={closeModal}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteStream: () => dispatch(deleteStream(ownProps.match.params.id)),
    fetchStream: () => dispatch(fetchStream(ownProps.match.params.id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);
