import { useState } from "react";
import {
    MobileStepper,
    Button,
} from "@material-ui/core/";


export default function ImgStepper({ imgFileName }) {
    const [activeStep, setActiveStep] = useState(0);

    const imgPlaceholder = "https://via.placeholder.com/200";
    const url = 'http://localhost:4000/upload/item/'
    const imgUrlArr = imgFileName.map(image => url + image)
    const maxSteps = imgUrlArr.length;

    const activeImg =
        maxSteps > 0
            ? imgUrlArr[activeStep]
            : imgPlaceholder;

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

    return (
        <>
            <img key="img" src={activeImg} alt={'imagen del item'}
                width='300' height='200'
            />
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
        </>

    )
}
