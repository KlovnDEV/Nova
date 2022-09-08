// core
import React from 'react';
// style
import './Dialog.scss';

function Dialog(props) {
  const { isOpen, title, children, noBackdrop, onApply, onCancel, ...rest } = props;

  return (
    <>
      <div
        className={$('dialog', isOpen ? 'is-open' : null, noBackdrop ? 'no-backdrop' : null)}
        {...rest}
      >
        <div className="dialog-backdrop">&nbsp;</div>
        <div className="dialog-body elevation-6">
          {title && <h2 className="dialog-title">{title}</h2>}
          {children}
          <div className="dialog-controls">
            {onApply && (
              <button type="button" className="dialog-btn" onClick={onApply}>
                Apply
              </button>
            )}
            {onCancel && (
              <button type="button" className="dialog-btn" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dialog;
