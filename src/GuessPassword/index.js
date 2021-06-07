import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {getNewPassword, verifyPassword} from './service/api';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function GuessPassword() {
  const [hint, setHint] = useState('');
  const [answer, setAnswer] = useState('');

  const sendAnswer = () => {
    verifyPassword({answer}).then(r=>console.log(r))
  };

  useEffect(() => {
    getNewPassword().then(r => setHint(r.hint));
  },[]);
  console.log(hint, answer)

  const classes = useStyles();
  return (
    <>
      <div>title</div>
      <div>Hint: {hint}</div>
      <div>input history </div>
      <div className={classes.root}>
        <TextField id="standard-basic" label="Standard" onChange={(v) => setAnswer(v.target.value)}/>
      </div>
      <button onClick={sendAnswer}>send</button>
    </>
  );
}

GuessPassword.protoTypes = {
};

export default GuessPassword;
