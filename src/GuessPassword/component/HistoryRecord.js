import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  highlight: {
    backgroundColor: 'green',
    borderRadius: 4,
    padding: 4,
    marginRight: 4,
    marginLeft: 4,
  },
  normal: {
    padding: 4,
  },
  suc: {
    backgroundColor: 'green',
    borderRadius: 4,
    padding: 4,
  },
  icon: {
    marginLeft: 8,
  },
}));

// display one history record
function HistoryRecord({
  data,
}) {
  const classes = useStyles();

  const isHighlight = (value) => {
    return (data.highlight.indexOf(value) !== -1);
  };

  // single digital
  const renderDigital = (value) => {
    return (
      <Typography
        className={isHighlight(value) ? classes.highlight : classes.normal}
        variant={'h5'}
        key={value}
      >
        {value}
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      {data.correct ? (
        <>
          <Typography variant={'h5'} className={classes.suc}>{data.answer}</Typography>
          <DoneIcon className={classes.icon}/>
        </>
      ) : (
        data.answer.split('').map((v) => {
          return renderDigital(v);
        })
      )}
    </div>
  );
}

HistoryRecord.protoTypes = {
  data: PropTypes.object.isRequired,
};

export default HistoryRecord;
