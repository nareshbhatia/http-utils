import { formatHttpError } from '../src';

describe('formatHttpError', () => {
    it('formats correctly when error.response but no error.response.data', () => {
        const error = {
            response: {},
            message: 'Error 1',
        };
        expect(formatHttpError(error)).toEqual('Error 1');
    });

    it('formats correctly when error.response.data.errors', () => {
        const error = {
            response: {
                data: {
                    errors: [
                        {
                            message: 'Error 1',
                        },
                        {
                            message: 'Error 2',
                        },
                    ],
                },
                status: 400,
                statusText: 'Bad Request',
            },
        };
        expect(formatHttpError(error)).toEqual('Error 1, Error 2');
    });

    // ----- Most common case -----
    it('formats correctly when error.response.data.message (common case)', () => {
        const error = {
            response: {
                data: {
                    message: 'Error 1',
                },
                status: 400,
                statusText: 'Bad Request',
            },
        };
        expect(formatHttpError(error)).toEqual('Error 1');
    });

    it('formats correctly when error.response but no data.message', () => {
        const error = {
            response: {
                data: {},
                status: 400,
                statusText: 'Bad Request',
            },
            message: 'Error 1',
        };
        expect(formatHttpError(error)).toEqual('Error 1');
    });

    it('formats correctly when error.request', () => {
        const error = {
            request: {},
            message: 'Error 1',
        };
        expect(formatHttpError(error)).toEqual('Error 1');
    });

    it('formats correctly when only error.message', () => {
        const error = {
            message: 'Error 1',
        };
        expect(formatHttpError(error)).toEqual('Error 1');
    });
});
