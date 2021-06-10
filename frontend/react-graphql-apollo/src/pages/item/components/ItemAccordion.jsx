import React from 'react'
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	AccordionActions,
	Typography,

} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ItemAccordion({item}) {
	return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={`panelSummay-${item.id}`}
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