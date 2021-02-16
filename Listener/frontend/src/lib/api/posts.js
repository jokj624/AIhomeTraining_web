import client from './client';
import qs from 'qs';

export const writePost = ({ title, body }) =>
    client.post('/api/posts', { title, body });

export const readPost = id => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username }) => {
    const queryString = qs.stringify({
        page,
        username
    });
    return client.get(`api/posts?${queryString}`);
};