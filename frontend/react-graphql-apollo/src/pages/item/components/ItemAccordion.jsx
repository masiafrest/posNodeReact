import React from 'react'
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	AccordionActions,
	Typography,

} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ItemAccordion() {
	return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}