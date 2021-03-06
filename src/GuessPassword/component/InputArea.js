import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgb(0 0 0 / 20%)',
    height: 48,
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    width: window.innerWidth / 4,
    minWidth: 200,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    color: '#c7c5c5',
    cursor: 'pointer',
  },
  input: {
    fontSize: 24,
    letterSpacing: 4,
  }
}));

function InputArea({
  value,
  onChange,
  clear,
  sendAnswer,
}) {
  const classes = useStyles();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendAnswer();
    }
  };

  return (
    <div>
      <TextField
        value={value}
        onChange={onChange}
        placeholder={"Please enter"}
        className={classes.root}
        InputProps={{
          disableUnderline: true,
          maxLength: 8,
          endAdornment: (value ==='' ? null : (
            <InputAdornment>
              <IconButton onClick={clear}>
                <HighlightOffIcon className={classes.icon}/>
              </IconButton>
            </InputAdornment>
          )),
          classes: {
            input: classes.input,
          },
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

InputArea.protoTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired,
};

export default InputArea;
