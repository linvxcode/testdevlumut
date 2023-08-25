import React, { useState } from "react";
import axios from "axios";

const ModalAddPost = (props) => {
    // console.log(props.user)
    const {users} = props.user;
    const [title , setTitle] = useState('');
    const [content , setContent] = useState('');
    const [date , setDate] = useState('');

    const AddPost = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/post', { title, content, date });
            window.my_modal_1.close();
            setContent('');
            setDate('');
            setTitle('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <dialog id="my_modal_1" className="modal">
                <form method="dialog"  className="modal-box">
                    <h3 className="font-bold text-lg">Add Post</h3>
                    <div className="py-4">
                    <label htmlFor="" className="w-full block">Title</label>
                    <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)} placeholder="Title" className="input input-bordered w-full max-w-xs" />
                    <label htmlFor="" className="w-full block mt-3">Content</label>
                    <textarea className="textarea textarea-bordered" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Bio"></textarea>
                    <label htmlFor="" className="w-full block">Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="date" className="input input-bordered w-full max-w-xs" />

                    </div>
                    <div className="modal-action">
                        <button onClick={() => window.my_modal_1.close()} className="btn">Close</button>
                        <button onClick={AddPost} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ModalAddPost;
