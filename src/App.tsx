import React from 'react'
import './App.css'
import { Stack, Button, Box } from '@mui/material'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import WidgetList from './components/WidgetList'
import CreateWidgetPage from './pages/CreateWidgetPage'

const App = (): JSX.Element => {
  return (
    <Router>
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {/* Fixed button at the top-right */}
        <Link to="/create-widget">
          <Button
            variant="contained"
            color="primary"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          >
            Create New Widget
          </Button>
        </Link>

        {/* Main content area */}
        <Stack
          spacing={3}
          sx={{
            padding: 2,
            alignItems: 'center', // Center widgets in the Stack
            justifyContent: 'center', // Vertically center widgets
          }}
        >
          {/* Define your Routes here */}
          <Routes>
            <Route path="/" element={<WidgetList />} /> {/* WidgetList page */}
            <Route path="/create-widget" element={<CreateWidgetPage />} /> {/* CreateWidgetPage */}
            <Route path="/edit-widget/:widgetName" element={<CreateWidgetPage />} /> {/* EditWidgetPage */}
          </Routes>
        </Stack>
      </Box>
    </Router>
  )
}

export default App
