import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BackBtn = () => {
    let navigate = useNavigate();
    return (
        <>
          <Button variant="outline-dark" className='btn gb-btn btn-light mx-1 my-3' onClick={() => navigate(-1)}>Go back</Button>
        </>
    );
};

export default BackBtn;
