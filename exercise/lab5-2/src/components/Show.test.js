
import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import Show from './Show';
//import userEvent from '@testing-library/user-event';

// 5.13: Watchlist tests, step1
test('renders Show', async() => {
    const show = {
        title: 'show 1 title',
        genre: 'drama',
        url: 'https://comp227.djosv.com/part5/testing_react_apps',
        likes: 20,
        recommender: '642fdc06f5ac5c49820326bd',
        id: '1'
    };
    render(<Show show={show} />);
    const showTitle = screen.getByText(show.title);
    expect(showTitle).toBeInTheDocument();


    const showGenre = screen.getByText(show.genre);
    screen.debug(showGenre);
    expect(showGenre).toBeInTheDocument();
    const showUrl = screen.queryByText(show.url);
    screen.debug(showUrl);
    expect(showUrl).not.toBeInTheDocument();
    const showLikes = screen.queryByText(show.likes);
    screen.debug(showLikes);
    expect(showLikes).not.toBeInTheDocument();




});


// 5.14: Watchlist tests, step2
test('shows show title', async() => {
    const show = {
        title: 'show 1 title',
        genre: 'drama',
        url: 'https://comp227.djosv.com/part5/testing_react_apps',
        likes: 20,
    };
    render(<Show show={show} />);
    const viewButton = screen.queryByText('view');
    screen.debug(viewButton);
    fireEvent.click(viewButton);
    const url = screen.queryByText(show.url);
    screen.debug(url);
    expect(url).toBeInTheDocument();

    const likes = screen.queryByText(show.likes);
    screen.debug(likes);
    expect(likes).toBeInTheDocument();
});


// 5.15: Watchlist tests, step3
test('clicking the like button twice calls the event handler twice', async () => {
    const mockHandler = jest.fn();
    const show = {
        title: 'show 1 title',
        genre: 'drama',
        url: 'https://comp227.djosv.com/part5/testing_react_apps',
        likes: 20,
        recommender: '642fdc06f5ac5c49820326bd',
        id: '1'
    };
    render(<Show show={show} handleLike={mockHandler} />);

    const viewButton = screen.queryByText('view');
    fireEvent.click(viewButton);
    const likeButton = screen.queryByText('update');
    screen.debug(likeButton);
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);


    expect(mockHandler.mock.calls).toHaveLength(2);
});



