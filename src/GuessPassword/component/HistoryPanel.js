import React from 'react';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import HistoryRecord from "./HistoryRecord";

const useStyles = makeStyles(() => ({
  root: {
    "@media (min-width: 420px)": {
      display: 'flex',
      alignItems: 'center',
    },
    paddingLeft: 16,
    paddingRight: 16,
  },
  att: {
    marginRight: 16,
  },
}));

function HistoryPanel({
  data,
}) {
  const classes = useStyles();

  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={`history_${index}`} className={classes.root}>
            <Typography className={classes.att}>Attempt {index + 1}: </Typography>
            <HistoryRecord data={item}/>
          </div>
        );
      })}
    </>
  );
}

HistoryPanel.protoTypes = {
  PropTypes: PropTypes.array.isRequired,
};

export default HistoryPanel;
