import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addNewPost} from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave =
        [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(addNewPost({ title, content, user: userId })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
            } catch (e) {
                console.error('Failed to save post', e)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

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

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" name="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    value={content}
                    name="postContent"
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>

            </form>
        </section>
    )
}