import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Widget } from '../../lib/apiConnect';

export interface DisplayWidgetProps {
  widget: Widget;
  onDelete: (widgetId: string) => void;
  onEdit: (widget: Widget) => void;
}

const WidgetDisplay = ({ widget, onDelete, onEdit }: DisplayWidgetProps): JSX.Element => {
  const { description, name, price } = widget;

  // Handle delete button click
  const handleDelete = () => {
    if (name) {
      onDelete(name); // Assuming the parent will handle deletion
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    onEdit(widget); // Trigger the onEdit function passed from parent with the widget data
  };

  return (
    <Grid item xs={6}>
      <Card sx={{ position: 'relative', '&:hover .delete-icon, &:hover .edit-icon': { opacity: 1 } }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>
            <Typography component="div" gutterBottom variant="h5">
              ${price}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
          </Stack>
        </CardContent>

        {/* Delete Icon */}
        <IconButton
          onClick={handleDelete}
          color="error"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            opacity: 0,
            transition: 'opacity 0.3s',
            '&:hover': { opacity: 1 },
          }}
          className="delete-icon"
        >
          <DeleteIcon />
        </IconButton>

        {/* Edit Icon */}
        <IconButton
          onClick={handleEdit}
          color="primary"
          sx={{
            position: 'absolute',
            top: 10,
            right: 50, // Slightly left from the delete icon
            opacity: 0,
            transition: 'opacity 0.3s',
            '&:hover': { opacity: 1 },
          }}
          className="edit-icon"
        >
          <EditIcon />
        </IconButton>
      </Card>
    </Grid>
  );
};

export default WidgetDisplay;
