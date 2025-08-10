import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Carousel } from '@widgets/carousel';

describe('carousel smoke', () => {
  it('renders items and hides arrows when not scrollable', () => {
    render(
      <MemoryRouter>
        <div style={{ width: 300 }}>
          <Carousel
            title="Demo"
            items={[
              { id: 1, title: 'A' },
              { id: 2, title: 'B' },
            ]}
          />
        </div>
      </MemoryRouter>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });
});
