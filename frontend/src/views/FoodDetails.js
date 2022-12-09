import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import CommentCard from './CommentCard'
import NewCommentForm from "./NewCommentForm";

function FoodDetails() {

	const { placeId } = useParams()

	const navigate = useNavigate()

	const [food, setFood] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:4000/food/${placeId}`)
			const resData = await response.json()
			setFood(resData)
		}
		fetchData()
	}, [placeId])

	if (food === null) {
		return <h1>Loading</h1>
	}

	function editFood() {
		navigate(`/food/${food.foodId}/edit`)
	}

	async function deleteFood() {
		await fetch(`http://localhost:4000/food/${food.foodId}`, {
			method: 'DELETE'
		})
		navigate('foods')
	}

	async function deleteComment(deletedComment) {
		await fetch(`http://localhost:4000/food/${food.foodId}/comments/${deletedComment.commentId}`, {
			method: 'DELETE'
		})

		setFood({
			...food,
			comments: food.comments
				.filter(comment => comment.commentId !== deletedComment.commentId)
		})
	}

	async function createComment(commentAttributes) {
		const response = await fetch(`http://localhost:4000/food/${food.foodId}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(commentAttributes)
		})

		const comment = await response.json()

		setFood({
			...food,
			comments: [
				...food.comments,
				comment
			]
		})

	}



	let comments = (
		<h3 className="inactive">
			No comments yet!
		</h3>
	)
	let rating = (
		<h3 className="inactive">
			Not yet rated
		</h3>
	)
	if (food.comments.length) {
		let sumRatings = food.comments.reduce((tot, c) => {
			return tot + c.stars
		}, 0)
		let averageRating = Math.round(sumRatings / food.comments.length)
		let stars = ''
		for (let i = 0; i < averageRating; i++) {
			stars += '⭐️'
		}
		rating = (
			<h3>
				{stars} stars
			</h3>
		)
		comments = food.comments.map(comment => {
			return (
				<CommentCard key={comment.commentId} comment={comment} onDelete={() => deleteComment(comment)} />
			)
		})
	}


	return (
		<main>
			<div className="row">
				<div className="col-sm-6">
					<img style={{ maxWidth: 200 }} src={food.pic} alt={food.place} />
					<h3>
						Located in {food.city}, {food.state}
					</h3>
				</div>
				<div className="col-sm-6">
					<h1>{food.place}</h1>
					<h2>
						Rating
					</h2>
					{rating}
					<br />
					<h2>
						Description
					</h2>
					<h3>
						{food.place} has been serving {food.city}, {food.state} since {food.founded}.
					</h3>
					<h4>
						Serving {food.cuisine}.
					</h4>
					<br />
					<a className="btn btn-warning" onClick={editFood}>
						Edit
					</a>{` `}
					<button type="submit" className="btn btn-danger" onClick={deleteFood}>
						Delete
					</button>
				</div>
			</div>
			<hr />
			<h2>Comments</h2>
			<div className="row">
				{comments}
			</div>
			<hr />
			<h2>Got Your Own Rant or Rave?</h2>
			<NewCommentForm
				food={food}
				onSubmit={createComment}
			/>
		</main>
	)
}

export default FoodDetails