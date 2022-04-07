/**
 * @About
 * This file contains Inline error.
 */

import React from "react";

// This components used for show inline errors
const InlineError = (props) => (
  <div>
    <div className="text-danger error-alert">{props.errorMessage}</div>
  </div>
);

export default InlineError;
