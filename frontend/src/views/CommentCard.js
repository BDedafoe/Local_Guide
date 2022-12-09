function CommentCard({ comment, onDelete }) {
    return (
        <div className="border col-sm-4">
            <h2>Hey</h2>
            <h4>{comment.content}</h4>
            <h3>
                <strong>- {comment.first_name}</strong>
            </h3>
            
            <button className="btn btn-danger" onClick={onDelete} >
                Delete Comment
            </button>
        </div>
    )
}

export default CommentCard;