import Carousel from "react-bootstrap/Carousel";
import atmosphere from "../../assets/atmosphere.jpg";
import atmosphere2 from "../../assets/atmosphere2.jpg";

function DarkVariantExample() {
	return (
		<Carousel data-bs-theme='dark' className='overflow-hidden w-100'>
			<Carousel.Item>
				<img
					className='d-block w-100'
					src={atmosphere}
					style={{ height: "100%" }}
					alt='First slide'
				/>
				<Carousel.Caption>
					<h5>First slide label</h5>
					<p>
						Nulla vitae elit libero, a pharetra augue mollis
						interdum.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className='d-block w-100 height-100'
					src={atmosphere2}
					alt='Second slide'
					style={{ height: "100%" }}
				/>
				<Carousel.Caption>
					<h5>Second slide label</h5>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className='d-block w-100'
					src={atmosphere2}
					alt='Third slide'
					style={{ height: "100%" }}
				/>
				<Carousel.Caption>
					<h5>Third slide label</h5>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}

export default DarkVariantExample;
