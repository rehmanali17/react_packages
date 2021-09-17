import axios from 'axios'

export const getPosts = ()=>{
    return axios.get('http://localhost:8081/posts')
}

export const addPost = (data)=>{
    return axios.post(`http://localhost:8081/posts`,data)
}

export const getSinglePost = ({ queryKey })=>{
    const [,id] = queryKey
    return axios.get(`http://localhost:8081/posts/${id}`)
}

export const editPost = (data)=>{
    const { id } = data
    const newData = {
        title: data.title,
        body: data.body
    }
    return axios.put(`http://localhost:8081/posts/${id}`,newData)
}

export const deletePost = (id)=>{
    return axios.delete(`http://localhost:8081/posts/${id}`)
}
