import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  btn: {
    textTransform: 'none',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
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

const GAME_PREPARE = 1;
const GAME_START = 2;
const GAME_WIN = 3;
const GAME_SERVER_ERROR = 100;

function GuessPassword() {
  const [hint, setHint] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState(GAME_PREPARE);
  const classes = useStyles();

  useEffect(() => {
    if (gameStatus === GAME_PREPARE) {
      setHistory([])
      getNewPassword().then(r => {setHint(r.hint); setGameStatus(GAME_START)}).catch(e => setGameStatus(GAME_SERVER_ERROR));
    }
  },[gameStatus]);

  const sendAnswer = () => {
    if (answer.length === 8) {
      verifyPassword({answer}).then(r => {
        setAnswer('');
        setHistory(Object.assign([], history, {[history.length]: r}))
        if (r.correct) {
          setGameStatus(GAME_WIN)
        }
      }).catch(e => setGameStatus(GAME_SERVER_ERROR));
    }
  };

  const handleEnterPassword = (value) => {
    const text = value.split('')
    let dup = text.some( (v, i, a) => {
      return a.lastIndexOf(v) !== i
    })
    if (dup) {
      return;
    }
    setAnswer(value.replace(/[^0-9]/g, '').substr(0,8));
  }

  if (gameStatus === GAME_PREPARE) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  } else if (gameStatus === GAME_SERVER_ERROR) {
    return (
      <div className={classes.loading}>
        <Typography>Server error, please try again later.</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant={'h6'}>Guess The Password!</Typography>
      <Divider className={classes.divider}/>
      <Typography variant={'subtitle1'}>Hint: {hint}</Typography>
      <div className={classes.panel}>
        <HistoryPanel data={history} />
      </div>
      {gameStatus === GAME_START && (
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
      )}
      {gameStatus === GAME_WIN && (
        <div className={classes.footer}>
          <Typography variant={'h6'}>You Win!</Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setGameStatus(GAME_PREPARE)}
            className={classes.btn}
          >
            Restart
          </Button>
        </div>
      )}
    </div>
  );
}

GuessPassword.protoTypes = {
};

export default GuessPassword;
