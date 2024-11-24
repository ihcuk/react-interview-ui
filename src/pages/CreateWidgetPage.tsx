import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { createWidgets, updateWidget, Widget, fetchAllWidgets } from '../lib/apiConnect'

const CreateWidgetPage = (): JSX.Element => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | string>('')
  const [error, setError] = useState<string | null>(null)
  const [existingWidgets, setExistingWidgets] = useState<Widget[]>([])
  const [isEditing, setIsEditing] = useState(false)

  const { widgetName } = useParams<{ widgetName: string }>() // Get the widget name for editing
  const navigate = useNavigate()

  // Fetch existing widgets once on mount
  useEffect(() => {
    if (widgetName) {
      // If editing, fetch only the widget being edited
      fetchAllWidgets()
        .then(widgets => {
          const widgetToEdit = widgets.find(widget => widget.name.toLowerCase() === widgetName.toLowerCase())
          if (widgetToEdit) {
            setName(widgetToEdit.name)
            setDescription(widgetToEdit.description)
            setPrice(widgetToEdit.price)
            setIsEditing(true)
          } else {
            navigate('/') // If widget is not found, redirect to home
          }
        })
        .catch(error => {
          console.error('Error fetching widgets:', error)
          navigate('/') // If fetching fails, redirect to home
        })
    } else {
      setIsEditing(false) // If not editing, ensure we're in create mode
    }
  }, [widgetName, navigate])

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Basic validation
    if (!name || !description || !price) {
      setError('All fields are required.')
      return
    }

    if (name.length < 3 || name.length > 100) {
      setError('Name must be between 3 and 100 characters.')
      return
    }

    // Check for uniqueness of the name (only if creating a new widget)
    if (!widgetName) {
      const isNameTaken = existingWidgets.some(widget => widget.name.toLowerCase() === name.toLowerCase())
      if (isNameTaken) {
        setError('Widget name must be unique.')
        return
      }
    }

    if (description.length < 5 || description.length > 1000) {
      setError('Description must be between 5 and 1000 characters.')
      return
    }

    // Validate price
    const priceValue = parseFloat(price.toString())
    if (isNaN(priceValue) || priceValue < 1 || priceValue > 20000 || !/^\d+(\.\d{1,2})?$/.test(price.toString())) {
      setError('Price must be a number between 1 and 20,000 with up to two decimal places.')
      return
    }

    const widget: Widget = { name, description, price: priceValue }

    try {
      if (isEditing) {
        // Update the widget if editing
        await updateWidget(widget.name, widget.description, widget.price)
        alert('Widget updated successfully!')
      } else {
        // Create new widget if not editing
        await createWidgets(widget)
        alert('Widget created successfully!')
      }

      navigate('/') // Redirect to the home page
    } catch (error) {
      setError('Failed to submit widget. Please try again.')
      console.error(error)
    }
  }

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Edit Widget' : 'Create a New Widget'}
      </Typography>
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Widget Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isEditing} // Disable name field when editing
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: '12px' }}>
          {isEditing ? 'Update Widget' : 'Create Widget'}
        </Button>
      </form>
    </Box>
  )
}

export default CreateWidgetPage
