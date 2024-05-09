import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Add from './Add'
import { expect } from 'vitest'

test('blog is created with correct parameters', async () => {
    const mockHandler = vi.fn()
    const { container } = render(<Add createBlog={mockHandler} />)
    const user = userEvent.setup()

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const submitButton = screen.queryByText('create')

    await user.type(titleInput, 'My Blog')
    await user.type(authorInput, 'Someone')
    await user.type(urlInput, '.fi')
    await user.click(submitButton)

    const newBlog = {
        title: 'My Blog',
        author: 'Someone',
        url: '.fi',
        isVisible: false,
    }

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual(newBlog)
})
