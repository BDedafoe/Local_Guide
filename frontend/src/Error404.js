function Error404() {

    return (
        <div className="errorPage">
            <h1>404 Error</h1>
            <h3>Hang on! We can't find this page...</h3>
            <img className="errorPic" src="http://localhost:4000/images/savannahError.png" alt="savannahError" />
        </div>
    );
}

export default Error404