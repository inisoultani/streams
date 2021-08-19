import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  //state = { isSignedIn: null };
  _isMounted = false;

  static CLIENT_ID =
    '1078326064252-9qkj1p0bpn93mlmn0fje3gvocflsuoqa.apps.googleusercontent.com';

  componentDidMount() {
    this._isMounted = true;
    window.gapi.load('client:auth2', () => {
      // executed when load finish
      window.gapi.client
        .init({
          clientId: GoogleAuth.CLIENT_ID,
          scope: 'email',
        })
        .then(
          () => {
            this.auth = window.gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            this.auth.isSignedIn.listen(this.updateSigninStatus);

            // handle intial state
            this.updateSigninStatus(this.auth.isSignedIn.get());
          },
          (error) => console.log(error),
        );
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateSigninStatus = (isSignedIn) => {
    //console.log(`is user signed in : ${isSignedIn}`);
    if (this._isMounted) {
      //this.setState({ isSignedIn: isSignedIn });
      if (isSignedIn) {
        this.props.signIn(this.auth.currentUser.get().getId());
      } else {
        this.props.signOut();
      }
    }
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return <div>I'm not sure, have you signed in ?</div>;
    } else if (this.props.isSignedIn) {
      return (
        <button
          onClick={() => this.auth.signOut()}
          className="ui red google button"
        >
          <i className="google icon" />
          SIGN OUT
        </button>
      );
    }
    return (
      <button
        onClick={() => this.auth.signIn()}
        className="ui blue google button"
      >
        <i className="google icon" />
        SIGN IN
      </button>
    );
  };

  render() {
    console.log('render');
    return <div className="item">{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    isSignedIn: state.loginStatus.isSignedIn,
    userId: state.loginStatus.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (userId) => dispatch(signIn(userId)),
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
//export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
