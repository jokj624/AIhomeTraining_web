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
    return client.get(`/api/posts?${queryString}`);
};

export const searchPosts = ({ page, option, content }) => {
  const queryString = qs.stringify({
    page,
    option,
    content
  });
  return client.get(`/api/posts/search?${queryString}`);
}

export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });

export const removePost = id => client.delete(`/api/posts/${id}`);
export const comment = ({text, username, id}) =>  
  client.post(`/api/posts/comments`, {text, username, id});
