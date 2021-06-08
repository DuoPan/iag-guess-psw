import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {
  GAME_SERVER_ERROR_GENERIC,
  GAME_SERVER_ERROR_HINT_NOT_FOUND
} from "../service/constant";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

const getText = code => {
  switch (code) {
    case GAME_SERVER_ERROR_HINT_NOT_FOUND:
      return "The hint is expired, please refresh.";
    case GAME_SERVER_ERROR_GENERIC:
    default:
      return "Server error, please try again later.";
  }
};

function ErrorInfo({
  code = GAME_SERVER_ERROR_GENERIC,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>{getText(code)}</Typography>
    </div>
  );
}

ErrorInfo.protoTypes = {
  code: PropTypes.number,
};

export default ErrorInfo;
