/* eslint-disable testing-library/no-wait-for-side-effects */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';  // Adjust the path if necessary

// Mock the axios request to prevent actual API calls during tests
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: [
      { "s.no": 1, "percentage.funded": 30, "amt.pledged": 5000, "currency": "USD" },
      { "s.no": 2, "percentage.funded": 50, "amt.pledged": 10000, "currency": "USD" },
      { "s.no": 3, "percentage.funded": 70, "amt.pledged": 20000, "currency": "USD" },
      { "s.no": 4, "percentage.funded": 90, "amt.pledged": 40000, "currency": "USD" },
      { "s.no": 5, "percentage.funded": 100, "amt.pledged": 80000, "currency": "USD" },
      { "s.no": 6, "percentage.funded": 80, "amt.pledged": 60000, "currency": "USD" },
    ],
  }),
}));

describe('App Component', () => {
  test('renders the table with the correct headers', async () => {
    render(<App />);
    
    // Wait for the table to render with the data
    const headers = await screen.findAllByRole('columnheader');
    
    // Verify the headers are present
    expect(headers[0]).toHaveTextContent('S.No.');
    expect(headers[1]).toHaveTextContent('Percentage Funded');
    expect(headers[2]).toHaveTextContent('Amount Pledged');
  });

  test('should disable previous button on the first page', async () => {
    render(<App />);
    
    // Wait for the table data to load
    await waitFor(() => {
      const prevButton = screen.getByText('Previous');
      expect(prevButton).toBeDisabled();  // Previous button should be disabled on the first page
    });
  });

  test('should disable next button on the last page', async () => {
    render(<App />);
    
    // Navigate to the last page
    await waitFor(() => {
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);
    });
    
    // Wait for the table data to load
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const nextButton = screen.getByText('Next');
      expect(nextButton).toBeDisabled();  // Next button should be disabled on the last page
    });
  });
});
