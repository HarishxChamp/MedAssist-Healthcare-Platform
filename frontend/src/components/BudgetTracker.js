import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Drawer,
  Divider,
  Fab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tab,
  Menu,
  Tooltip,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  AccountBalanceWallet,
  Delete,
  ChevronRight,
  GetApp,
  PieChart as PieChartIcon,
  Flag,
  Assessment,
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { saveAs } from 'file-saver';

const COLORS = ['#8E24AA', '#4A148C', '#AB47BC', '#7B1FA2', '#6A1B9A'];

const categories = [
  'Protein',
  'Pre-workout',
  'Vitamins',
  'Supplements',
  'Equipment',
  'Other'
];

const BudgetTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('1');
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('budgetItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newItem, setNewItem] = useState({ name: '', cost: '', category: '' });
  const [totalBudget, setTotalBudget] = useState(() => {
    const savedBudget = localStorage.getItem('totalBudget');
    return savedBudget ? parseFloat(savedBudget) : 0;
  });
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('budgetGoals');
    return savedGoals ? JSON.parse(savedGoals) : {};
  });

  useEffect(() => {
    localStorage.setItem('budgetItems', JSON.stringify(items));
    localStorage.setItem('budgetGoals', JSON.stringify(goals));
    localStorage.setItem('totalBudget', totalBudget.toString());
  }, [items, goals, totalBudget]);

  const handleAddItem = () => {
    if (newItem.name && newItem.cost && newItem.category) {
      setItems([...items, { ...newItem, id: Date.now(), date: new Date().toISOString() }]);
      setNewItem({ name: '', cost: '', category: '' });
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSetGoal = (category, amount) => {
    setGoals({ ...goals, [category]: amount });
  };

  const getCategoryTotal = (category) => {
    return items
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + parseFloat(item.cost), 0);
  };

  const getPieChartData = () => {
    return categories.map(category => ({
      name: category,
      value: getCategoryTotal(category)
    })).filter(item => item.value > 0);
  };

  const getProgressData = () => {
    const monthlyData = {};
    items.forEach(item => {
      const month = new Date(item.date).toLocaleString('default', { month: 'short' });
      monthlyData[month] = monthlyData[month] || 0;
      monthlyData[month] += parseFloat(item.cost);
    });
    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount
    }));
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Category', 'Cost'];
    const csvData = items.map(item => [
      new Date(item.date).toLocaleDateString(),
      item.name,
      item.category,
      item.cost
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'budget_report.csv');
  };

  const totalSpent = items.reduce((sum, item) => sum + parseFloat(item.cost), 0);
  const remaining = totalBudget - totalSpent;

  return (
    <>
      <Fab
        color="primary"
        aria-label="budget tracker"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          right: isOpen ? 330 : 20,
          bottom: 20,
          transition: 'all 0.3s ease',
        }}
      >
        {isOpen ? <ChevronRight /> : <AccountBalanceWallet />}
      </Fab>

      <Drawer
        variant="persistent"
        anchor="right"
        open={isOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            bgcolor: 'background.paper',
            p: 2,
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(_, newValue) => setTab(newValue)}>
              <Tab icon={<AccountBalanceWallet />} value="1" />
              <Tab icon={<PieChartIcon />} value="2" />
              <Tab icon={<Flag />} value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" className="gradient-text" gutterBottom>
                Budget Overview
              </Typography>
              <TextField
                fullWidth
                label="Total Budget"
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                sx={{ mb: 2 }}
              />
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Total Spent: ${totalSpent.toFixed(2)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: remaining < 0 ? 'error.main' : 'success.main' }}
                >
                  Remaining: ${remaining.toFixed(2)}
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" className="gradient-text" gutterBottom>
                Add New Item
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Cost"
                type="number"
                value={newItem.cost}
                onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddItem}
                className="button-hover"
              >
                Add Item
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value="2">
            <Typography variant="h6" className="gradient-text" gutterBottom>
              Spending Analysis
            </Typography>
            
            <Box sx={{ height: 200, mb: 4 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getPieChartData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {getPieChartData().map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getProgressData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8E24AA" />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Button
              fullWidth
              variant="contained"
              startIcon={<GetApp />}
              onClick={exportToCSV}
              sx={{ mt: 2 }}
              className="button-hover"
            >
              Export Report
            </Button>
          </TabPanel>

          <TabPanel value="3">
            <Typography variant="h6" className="gradient-text" gutterBottom>
              Category Goals
            </Typography>
            {categories.map(category => (
              <Box key={category} sx={{ mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  {category}
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  label="Monthly Goal"
                  value={goals[category] || ''}
                  onChange={(e) => handleSetGoal(category, e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      height: 8,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${Math.min((getCategoryTotal(category) / (goals[category] || 1)) * 100, 100)}%`,
                        height: '100%',
                        bgcolor: getCategoryTotal(category) > (goals[category] || 0) ? 'error.main' : 'success.main',
                      }}
                    />
                  </Box>
                  <Typography variant="body2">
                    ${getCategoryTotal(category).toFixed(2)} / ${(goals[category] || 0).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </TabPanel>
        </TabContext>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" className="gradient-text" gutterBottom>
          Recent Items
        </Typography>
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {items.slice().reverse().map((item) => (
            <ListItem key={item.id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
              <ListItemText
                primary={item.name}
                secondary={
                  <>
                    {item.category} - ${parseFloat(item.cost).toFixed(2)}
                    <br />
                    {new Date(item.date).toLocaleDateString()}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteItem(item.id)}
                  className="button-hover"
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default BudgetTracker;
