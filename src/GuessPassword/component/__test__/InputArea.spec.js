import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputArea from '../InputArea';

it('renders InputArea without crash', () => {
  const { container } = render(<InputArea onChange={() => {}} clear={() => {}} sendAnswer={() => {}} />);
  expect(container.querySelectorAll('input')).toHaveLength(1);
  expect(container.querySelectorAll('button')).toHaveLength(1);
  expect(container.querySelectorAll('svg')).toHaveLength(1);
});

it('clear button can be click', () => {
  const handleOnCLick = jest.fn();
  const { container } = render(<InputArea value={'10'} onChange={() => {}} clear={handleOnCLick} sendAnswer={() => {}} />);
  expect(container.querySelector('input')).toHaveAttribute('value', '10');

  const button = screen.queryAllByRole('button')[0];
  expect(handleOnCLick).not.toHaveBeenCalled();

  userEvent.click(button);
  expect(handleOnCLick).toHaveBeenCalled();
});

it('enter key can be triggered', () => {
  const handleOnKeyPress = jest.fn();
  render(<InputArea value={'10'} onChange={() => {}} clear={() => {}} sendAnswer={handleOnKeyPress} />);

  const input = screen.queryByDisplayValue('10');
  expect(handleOnKeyPress).not.toHaveBeenCalled();

  userEvent.type(input, '{enter}');
  expect(handleOnKeyPress).toHaveBeenCalled();
});