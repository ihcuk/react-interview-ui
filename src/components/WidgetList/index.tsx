import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import WidgetDisplay from '../WidgetDisplay'
import { fetchAllWidgets, Widget, deleteWidget } from '../../lib/apiConnect'

const WidgetList = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error('Error fetching widgets', error))
  }, [])

  // Handler to delete a widget
  const deleteWidgetHandler = (widgetName: string) => {
    console.log("Delete invoked ", widgetName)
    deleteWidget(widgetName)
      .then((success) => {
        if (success) {
          // If the widget is deleted successfully, refresh the list
          fetchAllWidgets()
            .then(setWidgets)
            .catch((error) => console.error('Error fetching widgets after deletion', error))
        } else {
          console.error('Failed to delete widget')
        }
      })
      .catch((error) => console.error('Error during widget deletion', error))
  }

  // Navigate to the edit page for the widget
  const editWidgetHandler = (widget: Widget) => {
    navigate(`/edit-widget/${widget.name}`)
  }

  return (
    <Stack spacing={4} sx={{ margin: 'auto', maxWidth: 900, paddingTop: '4em', width: '100%' }}>
      <Typography sx={{ textAlign: 'center' }} variant="h3">
        List of widgets:
      </Typography>
      <Grid container justifyContent="center" spacing={4} sx={{ paddingRight: 4, width: '100%' }}>
        {widgets.map((current, index) => (
          <WidgetDisplay
            key={index}
            widget={current}
            onDelete={() => deleteWidgetHandler(current.name)}
            onEdit={() => editWidgetHandler(current)} // Pass widget to edit handler
          />
        ))}
      </Grid>
    </Stack>
  )
}

export default WidgetList
