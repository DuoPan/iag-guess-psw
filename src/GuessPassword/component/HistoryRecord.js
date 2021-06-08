import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
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
}));

function HistoryRecord({
  data,
}) {
  const classes = useStyles();

  const isHighlight = (value) => {
    return (data.highlight.indexOf(value) !== -1);
  };

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
        <Typography variant={'h5'} className={classes.suc}>{data.answer}</Typography>
      ) : (
        data.answer.split('').map((v) => {
          return renderDigital(v);
        })
      )}
    </div>
  );
}

HistoryRecord.protoTypes = {
};

export default HistoryRecord;
