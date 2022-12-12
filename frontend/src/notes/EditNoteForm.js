import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"

function EditNoteForm() {

	const navigate = useNavigate()

    const { noteID } = useParams()

    const [note, setNote] = useState({
		name: '',
		pic: '',
		city: '',
		state: '',
		cuisines: ''
	})

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:4000/notes/${noteID}`)
			const resData = await response.json()
			setNote(resData)
		}
		fetchData()
	}, [ noteID ])

	async function handleSubmit(e) {
		e.preventDefault()

		await fetch(`http://localhost:4000/notes/${note.noteID}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		})

		navigate(`/notes/${note.noteID}`)
	}

	return (
		<main>
			<h1>Edit Note</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Place Name</label>
					<input
						required
						value={note.name}
						onChange={e => setNote({ ...note, name: e.target.value })}
						className="form-control"
						id="name"
						name="name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="city">City</label>
					<input
						value={note.city}
						onChange={e => setNote({ ...note, city: e.target.value })}
						className="form-control"
						id="city"
						name="city"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="state">State</label>
					<input
						value={note.state}
						onChange={e => setNote({ ...note, state: e.target.value })}
						className="form-control"
						id="state"
						name="state"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="cuisines">Cuisines</label>
					<input
						value={note.cuisines}
						onChange={e => setNote({ ...note, cuisines: e.target.value })}
						className="form-control"
						id="cuisines" name="cuisines" required />
				</div>
				<input className="btn btn-primary" type="submit" value="Save" />
			</form>
		</main>
	)
}

export default EditNoteForm