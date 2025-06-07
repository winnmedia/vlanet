import { render, screen } from '@testing-library/react';
import ProductAdGenerator from './ProductAdGenerator';

test('renders generator heading', () => {
  render(<ProductAdGenerator />);
  const heading = screen.getByText(/AI 광고 영상 생성/i);
  expect(heading).toBeInTheDocument();
});
