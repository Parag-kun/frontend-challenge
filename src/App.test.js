import { render, screen } from '@testing-library/react';
import App from './App';
import FormComponent from './components/FormComponent';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Form Component', () => {
  render(<FormComponent/>)
})
