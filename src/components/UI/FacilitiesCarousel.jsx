import Carousel from "react-bootstrap/Carousel";
import atmosphere1 from "../../assets/at1.jpg";
import atmosphere2 from "../../assets/at2.jpg";
import atmosphere3 from "../../assets/at3.jpg";
import atmosphere4 from "../../assets/at4.jpg";
import atmosphere5 from "../../assets/at5.jpg";
function DarkVariantExample() {
    return (
        <Carousel
            data-bs-theme="dark"
            className="overflow-hidden w-100 rounded-4"
        >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={atmosphere1}
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
                    src={atmosphere3}
                    alt="Third slide"
                    style={{ height: "100%" }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={atmosphere4}
                    alt="Forth slide"
                    style={{ height: "100%" }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={atmosphere5}
                    alt="Fifth slide"
                    style={{ height: "100%" }}
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default DarkVariantExample;
