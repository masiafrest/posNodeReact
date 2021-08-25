import { useState } from "react";
import { MobileStepper, Button, CardMedia } from "@material-ui/core/";
import { getImgUrls } from "../../../../utils";

export default function ImgStepper({ image_url }) {
  const [activeStep, setActiveStep] = useState(0);
  const IMGPLACEHOLDER = "https://via.placeholder.com/200";

  const imgUrlArr = getImgUrls(image_url);
  const maxSteps = imgUrlArr.length;

  const activeImg = maxSteps === 0 ? IMGPLACEHOLDER : imgUrlArr[activeStep];

  const NextBtn = (
    <Button
      id="mobileSteperNextBtn"
      size="small"
      onClick={() => {
        activeStep === maxSteps - 1
          ? setActiveStep(0)
          : setActiveStep(activeStep + 1);
      }}
    >
      Next
    </Button>
  );

  const BackBtn = (
    <Button
      id="mobileSteperBackBtn"
      size="small"
      onClick={() => {
        activeStep === 0
          ? setActiveStep(maxSteps - 1)
          : setActiveStep(activeStep - 1);
      }}
    >
      Back
    </Button>
  );

  const Img = () => (
    <img
      style={{}}
      key="img"
      src={activeImg}
      alt={"imagen del item"}
      width="300"
      height="300"
    />
  );

  const CardImg = () => (
    <CardMedia
      style={{
        width: 300,
        height: 300,
        margin: "auto",
      }}
      image={activeImg}
      title="item Img"
    />
  );

  return (
    <>
      <CardImg />
      {maxSteps > 1 && (
        <MobileStepper
          key="mobileStepper"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={NextBtn}
          backButton={BackBtn}
        />
      )}
      <hr />
    </>
  );
}
