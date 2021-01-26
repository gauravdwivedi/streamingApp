import React from 'react';
import ReactDom from 'react-dom';
import history from '../history';

const Modal = (props) => {
  return ReactDom.createPortal(
    <div
      onClick={() => history.push('/')}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">Delete Stream</div>
        <div className="content">Are you sure ?</div>
        <div className="actions">
          <div className="ui primary button">Delete</div>
          <div className="ui button">Cancel</div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
