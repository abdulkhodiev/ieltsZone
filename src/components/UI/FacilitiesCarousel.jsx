import Carousel from "react-bootstrap/Carousel";
import atmosphere from "../../assets/atmosphere.jpg";
import atmosphere2 from "../../assets/facc.jpg";

function DarkVariantExample() {
    return (
        <Carousel
            data-bs-theme="dark"
            className="overflow-hidden w-100 rounded-4"
        >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={atmosphere2}
                    style={{ height: "100%" }}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={atmosphere2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={atmosphere2}
                    alt="Third slide"
                    style={{ height: "100%" }}
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default DarkVariantExample;
