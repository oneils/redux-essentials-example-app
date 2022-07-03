import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {postAdded} from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content)
            )

            setTitle('')
            setContent('')
        }
    }
    return (
        <section>
            <h2>Add a new Post</h2>
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