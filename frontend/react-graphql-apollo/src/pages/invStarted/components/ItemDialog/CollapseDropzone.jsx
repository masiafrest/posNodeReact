import { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button, Collapse, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { resizeFile, dataURIToFile } from "./resizeUtils";
import { getImgUrls } from "../../../../utils";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: "10px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function CollapseDropzone({
  image_url,
  newItemState,
  enqueueSnackbar,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [newItem, setNewItem] = newItemState;
  const imgUrls = getImgUrls(image_url);
  return (
    <>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleExpandClick}
        endIcon={
          <ExpandMoreIcon
            className={expanded ? classes.expandOpen : classes.expand}
          />
        }
      >
        Agregar Imagen
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <DropzoneArea
          previewGridProps={{
            container: { spacing: 5 },
            item: { xs: 6 },
          }}
          initialFiles={imgUrls}
          acceptedFiles={["image/*"]}
          dropzoneText={"Drag and drop an image here or click"}
          onChange={async (files) => {
            try {
              let fileBlobResize = [];
              for (let i = 0; i < files.length; i++) {
                const image = await resizeFile(files[i]);
                const newFile = dataURIToFile(image, files[i].name);
                fileBlobResize.push(newFile);
              }
              setNewItem({ ...newItem, images: fileBlobResize });
            } catch (e) {
              enqueueSnackbar(e.message, {
                variant: "error",
              });
            }
          }}
        />
      </Collapse>
    </>
  );
}
