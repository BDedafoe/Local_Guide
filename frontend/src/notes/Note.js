import React from "react";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Item({ item, index, markItem, removeItem }) {
  return (
    <div className="itemList">
      <span style={{ textDecoration: item.isDone ? "line-through" : "" }}>{item.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markItem(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeItem(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormItem({ addItem }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addItem(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>In case you forget, make sure to take some notes!</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Notes..." />
    </Form.Group>
    <br></br>
    <button className="submitButton" type="submit">Add Item</button>
  </Form>
  );
}

function Note() {
  
  const [item, setItems] = React.useState([]);

  const addItems = text => {
    const newItems = [...item, { text }];
    setItems(newItems);
  };

  const markItem = index => {
    const newItems = [...item];
    newItems[index].isDone = true;
    setItems(newItems);
  };

  const removeItem = index => {
    const newItems = [...item];
    newItems.splice(index, 1);
    setItems(newItems);
  };


  return (
    <div className="listApp">
      <div className="fixed-list-container">
        <h1 className="text-center mb-4">Take Notes!</h1>
        <FormItem addItem={addItems} />
        <div>
          {item.map((item, index) => (
            <Card key={index}>
              <Card.Body>
                <Item
                
                index={index}
                item={item}
                markItem={markItem}
                removeItem={removeItem}
                />
              </Card.Body>
            </Card>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Note;