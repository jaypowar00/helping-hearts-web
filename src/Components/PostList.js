import React, { Component } from 'react'
import axios from 'axios'

class PostList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             posts : [],
             error_msg: ''
        }
    }
    
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response =>{
            console.log(response)
            this.setState({
                posts: response.data
            })
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error_msg: 'Error in retrieving data'
            })
        })
    }

    render() {
        const {posts, error_msg} = this.state
        return (
            <div>
                List of Posts
                {
                    posts.length ?
                    posts.map(post => <div key={post.id}>{post.title}</div>):
                    null
                } 
                {
                    error_msg.length? <div>{error_msg}</div>:null
                }
            </div>
        )
    }
}

export default PostList
