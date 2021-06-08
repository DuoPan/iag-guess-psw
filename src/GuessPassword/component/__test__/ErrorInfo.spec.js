import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorInfo from '../ErrorInfo';

it('renders ErrorInfo without crash', () => {
  render(<ErrorInfo />);
  expect(screen.getByText('Server error, please try again later.')).toBeInTheDocument();
});

it('renders ErrorInfo with right code', () => {
  render(<ErrorInfo code={101}/>);
  expect(screen.getByText('The hint is expired, please refresh.')).toBeInTheDocument();
});

it('renders ErrorInfo with wrong code', () => {
  render(<ErrorInfo code={200}/>);
  expect(screen.getByText('Server error, please try again later.')).toBeInTheDocument();
});
