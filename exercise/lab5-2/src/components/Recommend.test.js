// import React from 'react';
//
//
// import { render, fireEvent,screen } from '@testing-library/react';
// import Reccomendshow from './Reccomendshow';
//
//
// describe('Recommend', () => {
//     test('calls the event handler with the right details when a new show is added', () => {
//         const shows = [];
//         const setShows = jest.fn();
//         const setErrorMessage = jest.fn();
//         const recommendform = false;
//         const setrecommendform = jest.fn();
//         const addshows = jest.fn();
//
//         const { container } = render(
//             <Reccomendshow
//                 shows={shows}
//                 setShows={setShows}
//                 setErrorMessage={setErrorMessage}
//                 recommendform={recommendform}
//                 setrecommendform={setrecommendform}
//                 addshows={addshows}
//             />
//         );
//
//         const form = container.querySelector('form');
//         fireEvent.submit(form);
//
//         expect(addshows).toHaveBeenCalledTimes(1);
//         expect(addshows).toHaveBeenCalledWith({
//             title: '',
//             genre: '',
//             url: '',
//             likes: '',
//             recommender: '',
//         });
//     });
//
//
//     const titleInput = container.querySelector('#showtitle');
//         screen.debug(titleInput);
//         const genreInput = container.querySelector('#genre');
//         screen.debug(genreInput);
//         const urlInput = container.querySelector('#url');
//         screen.debug(urlInput);
//         const likesInput = container.querySelector('#likes');
//         screen.debug(likesInput);
//         const recommenderInput = container.querySelector('#recommender');
//         screen.debug(recommenderInput);
//         const form = container.querySelector('form');
//         screen.debug(form);
//
//         fireEvent.change(titleInput, {
//             target: { value: 'Stranger Things' }
//         });
//
//         fireEvent.change(genreInput, {
//             target: { value: 'Sci-Fi' }
//         });
//
//         fireEvent.change(urlInput, {
//             target: { value: 'https://www.netflix.com/title/80057281' }
//         });
//
//         fireEvent.change(likesInput, {
//             target: { value: '100' }
//         });
//
//         fireEvent.change(recommenderInput, {
//             target: { value: '642fdc06f5ac5c49820326bd' }
//         });
//
//         fireEvent.submit(form);
//
//         expect(addshows).toHaveBeenCalledTimes(1);
//         screen.debug(form);
//
//
//         // expect(addshows).t({
//
//     // //   title: 'Stranger Things',
//     // //   genre: 'Sci-Fi',
//     // //   url: 'https://www.netflix.com/title/80057281',
//     // //   likes: '100',
//     // //   recommender: '642fdc06f5ac5c49820326bd'
//     // })
//     });


import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Reccomendshow from './Reccomendshow';
describe('Recommend', () => {
    test('calls the event handler with the right details when a new show is added', () => {
        const shows = [];
        const setShows = jest.fn();
        const setErrorMessage = jest.fn();
        const recommendform = false;
        const setrecommendform = jest.fn();
        const addshows = jest.fn();
        const { container } = render(
            <Reccomendshow
                shows={shows}
                setShows={setShows}
                setErrorMessage={setErrorMessage}
                recommendform={recommendform}
                setrecommendform={setrecommendform}
                addshows={addshows}
            />
        );
        const titleInput = container.querySelector('#showtitle');
        screen.debug(titleInput);
        const genreInput = container.querySelector('#genre');
        screen.debug(genreInput);
        const urlInput = container.querySelector('#url');
        screen.debug(urlInput);
        const likesInput = container.querySelector('#likes');
        screen.debug(likesInput);
        const recommenderInput = container.querySelector('#recommender');
        screen.debug(recommenderInput);
        const form = container.querySelector('form');
        screen.debug(form);

        fireEvent.change(titleInput, {
            target: { value: 'Stranger Things' },
        });

        fireEvent.change(genreInput, {
            target: { value: 'Sci-Fi' },
        });

        fireEvent.change(urlInput, {
            target: { value: 'https://www.netflix.com/title/80057281' },
        });

        fireEvent.change(likesInput, {
            target: { value: '100' },
        });

        fireEvent.change(recommenderInput, {arget: { value: '642fdc06f5ac5c49820326bd' },
        });

        fireEvent.submit(form);

        expect(addshows).toHaveBeenCalledTimes(1);
        screen.debug(form);
    });
});



