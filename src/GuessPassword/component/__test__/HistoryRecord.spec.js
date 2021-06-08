import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HistoryRecord from '../HistoryRecord';

it('renders HistoryRecord without crash', () => {
  const { container } = render(<HistoryRecord data={{correct: false, hint: '32165497', highlight: [], answer: '12345678'}} />);
  expect(container.querySelectorAll('h5')).toHaveLength(8);
});

it('renders HistoryPanel when data is correct', () => {
  const { container } = render(<HistoryRecord data={{correct: true, hint: '32165497', answer: '32165497'}} />);
  expect(container.querySelector('h5')).toHaveTextContent('32165497');
  expect(container.querySelectorAll('h5')).toHaveLength(1);
});
