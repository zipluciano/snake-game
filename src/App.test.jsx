import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    // Mock window.matchMedia since it might be used by the component or its dependencies
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    // Mock window.AudioContext
    window.AudioContext = vi.fn().mockImplementation(() => ({
      createOscillator: vi.fn().mockImplementation(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        frequency: { value: 0 },
        type: '',
      })),
      createGain: vi.fn().mockImplementation(() => ({
        connect: vi.fn(),
        gain: { exponentialRampToValueAtTime: vi.fn(), setValueAtTime: vi.fn(), value: 0 },
      })),
      destination: {},
      currentTime: 0,
    }))

    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })
})
