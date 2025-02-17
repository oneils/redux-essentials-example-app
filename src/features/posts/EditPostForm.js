import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {postUpdated, selectPostById} from "./postsSlice";
import {useHistory} from "react-router-dom";

export const EditPostForm = ({match}) => {
    const {postId} = match.params

    const post = useSelector((state => selectPostById(state, postId)))

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postUpdated({
                    id: postId,
                    title,
                    content
                })
            )

            history.push(`/posts/${postId}`)

            setTitle('')
            setContent('')
        }
    }
    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    value={title}
                    name="postTitle"
                    onChange={onTitleChanged}
                />

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    value={content}
                    name="postContent"
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}