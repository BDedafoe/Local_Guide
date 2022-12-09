import { useEffect, useState } from "react";
import { useNavigate} from "react-router";

function FoodPage(data) {

	const navigate = useNavigate()
	
	const [foods, setFoods] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:4000/food`)
			const resData = await response.json()
			setFoods(resData)
		}
		fetchData()
	}, [])

	let foodsFormatted = foods.map((food) => {
		return (
			<div className="col-sm-6" key={food.foodId}>
				<h2>
					<a href="#" onClick={() => navigate(`/food/${food.foodId}`)} >
						{food.cuisine}
					</a>
				</h2>
				<p className="text-center">
					{food.cuisine}
				</p>
				<img style={{ maxWidth: 200 }} src={food.pic} alt={food.name} />
				<p className="text-center">
					Located in {food.city}, {food.state}
				</p>
			</div>
		)
	})
	return (
		<main>
			<h1>Places to Rant or Rave About</h1>
			<div className="row">
				{foodsFormatted}
			</div>
		</main>
	)
}

export default FoodPage;