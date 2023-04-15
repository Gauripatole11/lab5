const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return (
        <div className='error' id="error">
            {message}
        </div>
    );
};

export default Notification;