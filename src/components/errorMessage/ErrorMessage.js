import img from './error.gif'

const ErrorMessage = () => {

    return (
        // To import an img from the public folder
        //<img src={process.env.PUBLIC_URL + '/error.gif'} alt="An error occured" />
        <img src={img}
             alt="An error occured"
             style={{ display: 'block',
                        width: "250px",
                        height: "250px",
                        objectFit: 'contain',
                        margin: '0 auto'
                    }} />
    )
}

export default ErrorMessage;