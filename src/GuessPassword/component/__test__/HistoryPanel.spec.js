import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HistoryPanel from '../HistoryPanel';

it('renders HistoryPanel without crash', () => {
  const { container } = render(<HistoryPanel data={[{correct: false, hint: '32165497', highlight: [], answer: '12345678'}]} />);
  expect(container.querySelector('p')).toHaveTextContent('Attempt 1:');
  expect(container.querySelectorAll('h5')).toHaveLength(8);
});

it('renders HistoryPanel when data is correct', () => {
  const { container } = render(<HistoryPanel data={[{correct: true, hint: '32165497', answer: '32165497'}]} />);
  expect(container.querySelector('p')).toHaveTextContent('Attempt 1:');
  expect(container.querySelectorAll('h5')).toHaveLength(1);
});
