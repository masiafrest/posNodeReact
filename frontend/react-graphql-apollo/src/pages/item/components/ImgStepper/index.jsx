import { useState } from "react";
import {
	MobileStepper,
	Button,
	CardMedia
} from "@material-ui/core/";


export default function ImgStepper({ imgFileName }) {
	const [activeStep, setActiveStep] = useState(0);

	const imgPlaceholder = "https://via.placeholder.com/200";
	const url = 'http://localhost:4000/upload/item/'
	const imgUrlArr = imgFileName[0] === '' ? [] : imgFileName.map(image => url + image)
	const maxSteps = imgUrlArr.length;
	console.log('imgFileName:', imgFileName)
	console.log('imagUrlArr:', imgUrlArr)
	console.log('maxSteps: ', maxSteps)

	const activeImg =
		maxSteps === 0
			? imgPlaceholder
			: imgUrlArr[activeStep]

	const NextBtn = (
		<Button
			id="mobileSteperNextBtn"
			size="small"
			onClick={() => {
				activeStep === (maxSteps - 1) ?
					setActiveStep(0)
					: setActiveStep(activeStep + 1)
			}
			}
		>
			Next
		</Button>
	)

	const BackBtn = (
		<Button
			id="mobileSteperBackBtn"
			size="small"
			onClick={() => {
				activeStep === 0 ?
					setActiveStep(maxSteps - 1)
					: setActiveStep(activeStep - 1)
			}
			}
		>
			Back
		</Button>
	)

	const Img = () => (
		<img
			style={{
			}}
			key="img"
			src={activeImg}
			alt={'imagen del item'}
			width='300' height='200'
		/>
	)

	const CardImg = () => (
		<CardMedia
			style={{
				width: 300, height: 200,
				margin: 'auto'
			}}
			image={activeImg}
			title='item Img'
		/>
	)

	return (
		<>
			<CardImg />
			{
				maxSteps > 1 &&
				<MobileStepper
					key="mobileStepper"
					steps={maxSteps}
					position="static"
					activeStep={activeStep}
					nextButton={
						NextBtn
					}
					backButton={
						BackBtn
					}
				/>

			}
			<hr />
		</>

	)
}
