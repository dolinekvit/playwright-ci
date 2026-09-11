import { render, screen } from '@testing-library/react'
import { Counter } from './counter'
import { describe, expect, test } from 'vitest'

describe('Counter', () => {
  test('should render interface', () => {
    render(<Counter />)

    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })
})
