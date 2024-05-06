import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders not-done todo', () => {
    const todo = {
      text: 'Test this component',
      done: false
    }

    const mockHandler=vi.fn()
  
    render(<Todo todo={todo} onClickDelete={mockHandler} onClickComplete={mockHandler}/>)
  
    const textElement = screen.getByText('Test this component')
    const doneElement = screen.getByText('This todo is not done')
    expect(textElement).toBeDefined()
    expect(doneElement).toBeDefined()
  })