import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('only title and author are rendered by default', () => {
    const blog = {
        user: {
            username: 'mizhonka',
            name: 'MH',
        },
        title: 'Find This Title',
        author: 'Myself',
        url: '.org',
        likes: 0,
        isVisible: false,
    }

    render(<Blog blog={blog} user={{ username: 'mizhonka' }} />)
    screen.getByText('Find This Title', { exact: false })
    screen.getByText('Myself', { exact: false })
    const urlElement = screen.queryByText('.org')
    const likesElement = screen.queryByText('0')
    const nameElement = screen.queryByText('MH')

    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
    expect(nameElement).toBeNull()
})

test('more info is rendered when blog is visible', async () => {
    const blog = {
        user: {
            username: 'mizhonka',
            name: 'MH',
        },
        title: 'Find This Title',
        author: 'Myself',
        url: '.org',
        likes: 0,
        isVisible: true,
    }

    render(<Blog blog={blog} user={{ username: 'mizhonka' }} />)
    screen.getByText('Find This Title', { exact: false })
    screen.getByText('Myself', { exact: false })
    screen.getByText('.org', { exact: false })
    screen.getByText('0', { exact: false })
    screen.getByText('MH', { exact: false })
})

test('like gets called twice when clicked twice', async () => {
    const blog = {
        user: {
            username: 'mizhonka',
            name: 'MH',
        },
        title: 'Find This Title',
        author: 'Myself',
        url: '.org',
        likes: 0,
        isVisible: true,
    }

    const mockHandler = vi.fn()
    render(
        <Blog
            blog={blog}
            user={{ username: 'mizhonka' }}
            handleLike={mockHandler}
        />,
    )
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
