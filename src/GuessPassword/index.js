import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {getNewPassword, verifyPassword} from './service/api';
import InputArea from "./component/InputArea";
import HistoryPanel from "./component/HistoryPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  btn: {
    textTransform: 'none',
    marginLeft: 20,
    marginBottom: 20,
  },
  footer: {
    "@media (min-width: 420px)": {
      marginBottom: 50,
    },
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  panel: {
    flexGrow: 1,
    overflowY: 'auto',
    minWidth: 100,
  },
  header: {
    marginTop: 20,
    "@media (min-width: 420px)": {
      marginTop: 50,
    },
  },
  divider: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  }
}));

function GuessPassword() {
  const [hint, setHint] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);

  const sendAnswer = () => {
    if (answer.length === 8) {
      verifyPassword({answer}).then(r => {
        setAnswer('');
        setHistory(Object.assign([], history, {[history.length]: r}))
      });
    }
  };

  const handleEnterPassword = (value) => {
    let c = value.charAt(value.length -1);
    if (value.length > answer.length && answer.indexOf(c) !== -1) {
      return;
    }
    setAnswer(value.replace(/[^0-9]/g, '').substr(0,8));
  }

  useEffect(() => {
    getNewPassword().then(r => setHint(r.hint));
  },[]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant={'h6'}>Guess The Password!</Typography>
      <Divider className={classes.divider}/>
      <Typography variant={'subtitle1'}>Hint: {hint}</Typography>
      <div className={classes.panel}>
        <HistoryPanel data={history} />
      </div>
      <div className={classes.footer}>
        <InputArea
            value={answer}
            onChange={(v) => handleEnterPassword(v.target.value)}
            clear={() => sendAnswer('')}
            sendAnswer={sendAnswer}
        />
        <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={sendAnswer}
            disabled={answer.length < 8}
            className={classes.btn}
        >
          Verify Password
        </Button>
      </div>
    </div>
  );
}

GuessPassword.protoTypes = {
};

export default GuessPassword;
